use engine for specific NVIDIA version (20xx, 30xx, ...)
```
#!/bin/bash

IMAGE="nvcr.io/nvidia/tensorrt:25.05-py3"
CONTAINER_NAME="tensorrt_engine_builder_$(date +%s)"
ONNX_DIR="/home/deepvision/onnx"
VERSION="2505_20xx"
CVT_FILE="cvt_onnx_$VERSION.sh"

# Parse engine filenames from the script
ENGINE_FILES=$(grep -- '--saveEngine=' scripts/$CVT_FILE | sed -E 's/.*--saveEngine=([^ ]+).*/\1/')

echo "Using Engine Files: $ENGINE_FILES"

# Run the container in detached mode
docker run --gpus all -dit --name $CONTAINER_NAME $IMAGE bash

# Copy the ONNX directory into the container
docker cp $ONNX_DIR/. $CONTAINER_NAME:/workspace/onnx

# Copy the conversion script into the container
docker cp scripts/$CVT_FILE $CONTAINER_NAME:/workspace/

# Execute the script inside the container
docker exec $CONTAINER_NAME bash -c "cd /workspace && chmod +x $CVT_FILE && ./$CVT_FILE"

# Create local engine directory if not exists
mkdir -p ./engine

# Copy each engine file from container to local ./engine directory
for ENGINE_FILE in $ENGINE_FILES; do
    docker cp $CONTAINER_NAME:/workspace/$ENGINE_FILE ./engine/
    if [ $? -eq 0 ]; then
        echo "$ENGINE_FILE copied successfully to ./engine/"
    else
        echo "Failed to copy $ENGINE_FILE"
    fi
done

# Stop and remove the container
docker stop $CONTAINER_NAME
```
