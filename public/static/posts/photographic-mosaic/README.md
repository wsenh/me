---
title: "How to Make Photographic Mosaic Images with Python"
timestamp: 1614310322
coverImage: "/static/imgs/photographic-mosaic/cover.jpg"
excerpt: "According to Wikipedia, photographic mosaic is a picture that has been divided into tiled sections, each of which is replaced with another photograph that matches the target photo."
ogImage:
  url: "/static/imgs/photographic-mosaic/cover.jpg"
---

## About

According to [Wikipedia](https://en.wikipedia.org/wiki/Photographic_mosaic), photographic mosaic is a picture that has been divided into tiled sections, each of which is replaced with another photograph that matches the target photo.

![Photographic Mosaic Shiba](/static/posts/photographic-mosaic/assets/output/3.jpg)

## General Idea of Making One

The description of photographic mosaic clearly described the method of making a photographic mosaic image.

To prepare a photographic mosaic image, we need a target image and a source image set. We are composing the target image using images from the source image set.

The more detailed steps are:

1. Crop a small area of the target image.
2. Analyze the color of the area (could be averaging all the colors).
3. Find a similar image (the tile) in the source set by doing the same color analysis.
4. Resize and replace the area with the similar tile image.
5. Repeat from step 1 until target image is replaced entirely by the tiles.

<video autoPlay muted playsInline controls>
  <source src="/static/imgs/photographic-mosaic/illustration.webp" type="video/webp" />
  <source src="/static/imgs/photographic-mosaic/illustration.mp4" type="video/mp4" />
</video>

## The Code

### Image Preparation

I downloaded some [shiba images](/static/posts/photographic-mosaic/assets/source) from [pinterest.ca](https://www.pinterest.ca/) as our source image set, and we will use some of them as the target image to produce photographic mosaic.

I put all the source images in `assets/source` folder, and created a `assets/output` folder for storing our output images.

### Python Package

We will be using a powerful Python Image Library [Pillow](https://pypi.org/project/Pillow/) to manipulate the images. Make sure you have [Python 3](https://www.python.org/) and Pillow installed.

You can install Pillow with pip by:

```bash
pip3 install pillow
```

### Main Python File

Create a Python file [mosaic.py](/static/posts/photographic-mosaic/mosaic.py) and import the necessary libraries.

```python
from PIL import Image
import os
import math
```

### Preprocessing the Images

Since the source images have different width and heights, we need a way to turn them into the same size for easy alignment. The simplest way is to crop them into squares and resize them to the same size.

```python
def crop_square_img(path, output_dim):
    """
    Args:
        path: The path to the image
        output_dim: The final image dimension
    """
    img = Image.open(path)

    # Crop along the minimum axis of the image
    dim = min(img.width, img.height)

    # Compute the crop boundary
    left = (img.width - dim) / 2
    right = left + dim
    up = (img.height - dim) / 2
    down = up + dim

    return img.crop((left, up, right, down)) \
        .resize((output_dim, output_dim))
```

### Analyze Image Color

In this example, we use the averages of the 3 channels in the image as the color of the image.

_Note: I said 3 channels here instead of RGB, since we could use other color spaces here._

```python
def get_avg_color(img):
    """
    Averaging all the pixels value in the image on 3 channels

    Args:
        img: The pillow image object
    """
    sum0 = 0
    sum1 = 0
    sum2 = 0

    # The channel data of each pixel as [(c1,c2,c3), ..., (c1,c2,c3)]
    data = img.getdata()

    length = len(data)
    for i in range(length):
        sum0 += data[i][0]
        sum1 += data[i][1]
        sum2 += data[i][2]

    return sum0 / length, sum1 / length, sum2 / length
```

### Color Distance

To find a similar image, we compare the two represented colors in both images. In this article, the two represented colors are the average color computed above. And we compare the [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) as the metrics of image similarity.

```python
def euclidean_distance(c1, c2):
    """
    The Euclidean distance of two colors

    Args:
        c1: Color 1
        c2: Color 2
    """
    return math.sqrt(
        (c1[0] - c2[0]) ** 2 + \
        (c1[1] - c2[1]) ** 2 + \
        (c1[2] - c2[2]) ** 2)
```

### Find the Most Similar Substituting Image

To find the most similar tile of a color, we find the minimum Euclidean distance between colors.

```python
def find_min_dist_i(color, tiles):
    """
    Find the minimum distance tile of the given color

    Args:
        color: The color
        tiles: Available tiles
    """
    best_i = 0
    best_dist = math.inf
    for i, tile in enumerate(tiles):
        dist = euclidean_distance(color, tile['color'])
        if dist < best_dist:
            best_dist = dist
            best_i = i
    return best_i
```

### Produce Mosaic Image

Now we can use the above functions to create a Mosaic image. The `color_space` parameter is the color space we are using for finding the most similar images. In this case, we use YCbCr color space for a potentially better output result.

```python
def make_mosaic(img, tiles, color_space='YCbCr'):
    """
    Produce mosaic image

    Args:
        img: The target image
        tiles: The available tiles
        color_space: The image color space
    """
    # Make sure we have at least 1 tile in the tile set
    assert len(tiles) > 0

    # Assume we have the same dimension for all the tiles
    tile_dim = tiles[0]['img'].width

    dest = Image.new(color_space, (img.width, img.height))
    data = img.getdata()

    for i in range(0, img.width, tile_dim):
        for j in range(0, img.height, tile_dim):
            # Crop a small area for color comparison
            left = i
            right = left + tile_dim
            up = j
            down = up + tile_dim
            sub_img = img.crop((left, up, right, down))

            color = get_avg_color(sub_img)

            best_tile_i = find_min_dist_i(color, tiles)
            tile = tiles[best_tile_i]

            # Paste the tile image to final image
            dest.paste(tile['img'], (i, j))

    return dest
```

### Configurate and Produce Output

Now that we have all the functions we need, we can start producing the images.

We first define some constants.

```python
# Configurations
SOURCE_IMG_DIM = 16  # the dimension of the source images
OUTPUT_IMG_RATIO = 64  # the ratio of output image dimension to source image dimension
COLOR_SPACE = 'YCbCr'  # The comparison color space
```

Read all the source files, and create tiles.

```python
"""
Create tiles
"""
tiles = []

for (dirpath, _, filenames) in os.walk('source'):
    for filename in filenames:
        path = os.path.join(dirpath, filename)
        img = crop_square_img(path, SOURCE_IMG_DIM).convert(COLOR_SPACE)
        tiles.append({ "color": get_avg_color(img), "img": img })
```

For each source image, we use them as target image and generate the Mosaic image.

```python
"""
Generate Photographic Mosaic for each source image
"""
FINAL_DIM = SOURCE_IMG_DIM * OUTPUT_IMG_RATIO
for (dirpath, _, filenames) in os.walk('source'):
    for filename in filenames:
        path = os.path.join(dirpath, filename)
        target = crop_square_img(path, FINAL_DIM).convert(COLOR_SPACE)
        res = make_mosaic(target, tiles).convert('RGB')
        res.save(os.path.join('output', filename))
```

All the output images will be saved to `assets/output` folder. You can view the result images [here](https://github.com/wsenh/me/tree/main/public/static/posts/photographic-mosaic/assets/output).

![](/static/posts/photographic-mosaic/assets/output/8.jpg)

![](/static/posts/photographic-mosaic/assets/output/1.jpg)

![](/static/posts/photographic-mosaic/assets/output/23.jpg)

### Improvement

To generate a better result, we can:

- include more source images with different color to extend our color palette, and
- increase the `OUTPUT_IMG_RATIO`.

## Source Code

Run locally: [mosaic.py](/static/posts/photographic-mosaic/mosaic.py)

Run on Google Colab: [mosaic.ipynb](/static/posts/photographic-mosaic/mosaic.ipynb)

## Source Images

All the source images are taken from [pinterest.ca](https://www.pinterest.ca/).

[1](https://www.pinterest.ca/pin/21603273201570044/),
[2](https://www.pinterest.ca/pin/79727855893221916/),
[3](https://www.pinterest.ca/pin/19210735897592566/),
[4](https://www.pinterest.ca/pin/128071183140116539/),
[5](https://www.pinterest.ca/pin/552887291759768784/),
[6](https://www.pinterest.ca/pin/707417053968540420/),
[7](https://www.pinterest.ca/pin/713046553498833634/),
[8](https://www.pinterest.ca/pin/38421403060846107/),
[9](https://www.pinterest.ca/pin/5840674504223823/),
[10](https://www.pinterest.ca/pin/215609900898656965/),
[11](https://www.pinterest.ca/pin/122160208629549349/),
[12](https://www.pinterest.ca/pin/463730092886168236/),
[13](https://www.pinterest.ca/pin/11470174037651174/),
[14](https://www.pinterest.ca/pin/215609900898656965/),
[15](https://www.pinterest.ca/pin/67905906872994372/),
[16](https://www.pinterest.ca/pin/3025924735686216/),
[17](https://www.pinterest.ca/pin/527624912600103955/),
[18](https://www.pinterest.ca/pin/38632509290809856/),
[19](https://www.pinterest.ca/pin/3025924735689560/),
[20](https://www.pinterest.ca/pin/330451691410904198/),
[21](https://www.pinterest.ca/pin/448952656606880462/),
[22](https://www.pinterest.ca/pin/605312006154817470/),
[23](https://www.pinterest.ca/pin/128071183140116543/),
[24](https://www.pinterest.ca/pin/675891856577714683/),
[25](https://www.pinterest.ca/pin/614811786623092436/),
[26](https://www.pinterest.ca/pin/92253492354833964/),
[27](https://www.pinterest.ca/pin/20125529574371926/),
[28](https://www.pinterest.ca/pin/107312403596141760/),
[29](https://www.pinterest.ca/pin/157063105744990102/),
[30](https://www.pinterest.ca/pin/242209286197942667/).
