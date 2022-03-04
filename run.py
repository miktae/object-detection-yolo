import detect
detect.run(
    weights = 'runs/train/exp/weights/best.pt',
    data = 'data/data.yaml',
    source = 'data/images/test.jpg'
)
print(detect.totalBad)
print(detect.totalGood)