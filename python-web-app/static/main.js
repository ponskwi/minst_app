const canvasElement = document.getElementById('draw-area')
const canvas = new HandwritingCanvas(canvasElement)

const clearBUttonElement = document.getElementById('clear-button')
clearBUttonElement.addEventListener('click', () => {
    canvas.clear()
})

const predictButtonElement = document.getElementById('predict-button')
predictButtonElement.addEventListener('click', async () => {
    if (canvas.isEmpty){
        return
    }

    //推論実行

    const blob = await canvas.toBlob('imgae/png')
    const formData = new FormData()
    formData.append('image', blob, 'number.png')

    const response = await fetch('/api/predict', {
        method: 'POST',
        body: formData
    })

    const responseData = await response.json();

    //結果の画像を表示
    const imageURL = URL.createObjectURL(blob)

    const imgElement = document.createElement('img')

    const tableBodyElement = document.getElementById('result-table-body');
    imgElement.src = imageURL

    const resultImageElement = document.getElementById('result-image');

    if(resultImageElement.firstChild){
        resultImageElement.removeChild(resultImageElement.firstChild);
    }

    resultImageElement.appendChild(imgElement);

    canvas.clear();

    //推論結果をtbodyに表示
    while(tableBodyElement.firstChild){
        tableBodyElement.removeChild(tableBodyElement.firstChild);
    }

    const probabilities = responseData['probabilities'];
    for(let i = 0; i < probabilities.length; i++){
        const tr = document.createElement('tr');

        //数字
        const tdNumber = document.createElement('td');
        tdNumber.textContent = i;
        tr.appendChild(tdNumber);

        //確率
        const tdProbability = document.createElement('td');
        tdProbability.textContent = (probabilities[i] * 100).toFixed(1);
        tr.appendChild(tdProbability);

        tableBodyElement.appendChild(tr);
    }
})