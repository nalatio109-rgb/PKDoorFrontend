from PIL import Image

def remove_white_background(input_path, output_path, tolerance=240):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Check if the pixel is close to white
        if item[0] >= tolerance and item[1] >= tolerance and item[2] >= tolerance:
            newData.append((255, 255, 255, 0)) # Fully transparent
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")

input_file = r"C:\Users\Admin\.gemini\antigravity\brain\4c914138-5dde-466b-b46c-faf7e28d79a1\waving_red_ribbon_1777351289778.png"
output_file = r"d:\PK-Door\frontend-pkdoor\src\assets\ribbon.png"

remove_white_background(input_file, output_file)
print("Background removed and saved to ribbon.png")
