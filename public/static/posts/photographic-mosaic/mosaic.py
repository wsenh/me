# -*- coding: utf-8 -*-
from PIL import Image
import os
import math

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

    return img.crop((left, up, right, down)).resize((output_dim, output_dim))

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

# Configurations
SOURCE_IMG_DIM = 16  # the dimension of the source images
OUTPUT_IMG_RATIO = 64  # the ratio of output image dimension to source image dimension
COLOR_SPACE = 'YCbCr'  # The comparison color space

"""
Create tiles
"""
tiles = []

for (dirpath, _, filenames) in os.walk('source'):
    for filename in filenames:
        path = os.path.join(dirpath, filename)
        img = crop_square_img(path, SOURCE_IMG_DIM).convert(COLOR_SPACE)
        tiles.append({ "color": get_avg_color(img), "img": img })

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
