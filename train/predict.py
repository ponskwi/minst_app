import numpy as np
from PIL import Image
import onnxruntime

pil_image = Image.open('train/sample.png')

# Resize the image to 28x28
resized_image = pil_image.resize((28, 28))
resized_array = np.array(resized_image)
print(f"resized_array.shape: {resized_array.shape}")

transposed_array = resized_array.transpose(2, 0, 1)
print(f"transposed_array.shape: {transposed_array.shape}")

alpha_arr = transposed_array[3]
print("alpha_arr")
for i in alpha_arr:
    for j in i:
        print("%3d " % j, end="")
    print()

reshaped_array = alpha_arr.reshape(-1)
print("reshaped_array")
print(reshaped_array)

input = [reshaped_array.astype(np.float32)]
print("input")
print(input)

onnx_session = onnxruntime.InferenceSession('train/model.onnx')

outout = onnx_session.run(['probabilities'], {'float_input': input})
print('output')
print(outout)

result = outout[0][0]
print("result")
print(result)