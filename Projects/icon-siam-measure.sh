#!/usr/bin/env bash
# Measure spec + 1-minute resource peaks on all icon-siam servers, in parallel.
# Usage: bash icon-siam-measure.sh              (all hosts in ~/.ssh/config_icon_proxy)
#        bash icon-siam-measure.sh proxy-icon-6 proxy-icon-7
set -u

CONFIG=~/.ssh/config_icon_proxy
OUT=~/Downloads/icon-siam-measure-$(date +%Y%m%d-%H%M)
mkdir -p "$OUT"

if [ $# -gt 0 ]; then HOSTS="$*"; else HOSTS=$(awk '/^Host /{print $2}' "$CONFIG"); fi

read -r -d '' REMOTE <<'EOF'
echo "host $(hostname) | $(date) | $(uptime)"
echo "== SPEC =="
lscpu | grep -E 'Model name|^CPU\(s\)|Core\(s\) per socket|Socket\(s\)'
free -h | head -2
HAS_GPU=0; command -v nvidia-smi >/dev/null && HAS_GPU=1
HAS_DOCKER=0; docker ps >/dev/null 2>&1 && HAS_DOCKER=1
if [ $HAS_GPU = 1 ]; then nvidia-smi --query-gpu=index,name,memory.total,driver_version --format=csv,noheader; else echo "GPU: none (no nvidia-smi)"; fi
[ $HAS_DOCKER = 1 ] || echo "docker: not available or no permission"

D=$(mktemp -d)
if [ $HAS_GPU = 1 ]; then
  nvidia-smi --query-gpu=index,utilization.gpu,memory.used --format=csv,noheader,nounits -l 2 > $D/gpu & G=$!
fi
for i in $(seq 12); do
  free -m | awk '/Mem:/{print $3}' >> $D/mem
  if [ $HAS_DOCKER = 1 ]; then
    docker stats --no-stream --format '{{.Name}} {{.CPUPerc}} {{.MemUsage}}' >> $D/ctr
    sleep 3
  else
    sleep 5
  fi
done
[ $HAS_GPU = 1 ] && kill $G

if [ $HAS_GPU = 1 ]; then
  echo "== GPU (1 min) =="
  awk -F', ' '{u[$1]+=$2; n[$1]++; if($2>mu[$1])mu[$1]=$2; if($3>mm[$1])mm[$1]=$3} END{for(k in n) printf "gpu %s: util avg %.0f%% max %d%% | VRAM max %d MiB\n",k,u[k]/n[k],mu[k],mm[k]}' $D/gpu
fi
echo "== HOST RAM used (MiB, 1 min) =="
awk '{s+=$1; if($1>m)m=$1; n++} END{printf "avg %.0f max %d\n",s/n,m}' $D/mem
if [ $HAS_DOCKER = 1 ]; then
  echo "== CONTAINERS =="
  docker ps --format '{{.Names}}\t{{.Image}}\t{{.Status}}'
  echo "== CONTAINER PEAKS (1 min) =="
  awk '{c=$2; sub("%","",c); v=$3+0; if($3~/GiB/)v*=1024; else if($3~/KiB/)v/=1024; if(c+0>C[$1])C[$1]=c+0; if(v>M[$1])M[$1]=v} END{for(k in C) printf "%-48s cpu max %6.1f%%  mem max %7.0f MiB\n",k,C[k],M[k]}' $D/ctr | sort -k6 -nr
fi
rm -rf $D
EOF

echo "Measuring: $HOSTS"
echo "Takes ~1-2 min. Output: $OUT"
for h in $HOSTS; do
  ssh -o BatchMode=yes -o ConnectTimeout=20 "$h" 'bash -s' <<<"$REMOTE" > "$OUT/$h.txt" 2>&1 \
    && echo "done: $h" || echo "FAILED: $h (see $OUT/$h.txt)" &
  sleep 2  # jump host resets connections when too many open at once
done
wait

for h in $HOSTS; do echo "########## $h"; cat "$OUT/$h.txt"; echo; done > "$OUT/ALL.txt"
echo "Combined: $OUT/ALL.txt"
