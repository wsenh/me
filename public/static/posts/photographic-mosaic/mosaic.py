# -*- coding: utf-8 -*-
from PIL import Image
import os
import math

def get_avg_color(img):
    sum0 = 0
    sum1 = 0
    sum2 = 0
    data = img.getdata()
    length = len(data)
    for i in range(length):
        sum0 += data[i][0]
        sum1 += data[i][1]
        sum2 += data[i][2]
    return sum0 / length, sum1 / length, sum2 / length

def get_square_img(path, size, format='YCbCr'):
    img = Image.open(path)

    dim = min(img.width, img.height)
    l = (img.width - dim) / 2
    r = l + dim
    u = (img.height - dim) / 2
    d = u + dim

    return img.crop((l, u, r, d)).resize(size).convert(format)

def color_dist(c1, c2):
    return math.sqrt(
        (c1[0] - c2[0]) ** 2 + \
        (c1[1] - c2[1]) ** 2 + \
        (c1[2] - c2[2]) ** 2)

def find_min_dist(color, tiles):
    best_i = 0
    best_dist = math.inf
    for i, tile in enumerate(tiles):
        dist = color_dist(color, tile['color'])
        if dist < best_dist:
            best_dist = dist
            best_i = i
    return best_i

def make_mosaic(img, tiles, format='YCbCr'):
    tile_dim = tiles[0]['img'].width
    dest = Image.new(format, (img.width, img.height))
    data = img.getdata()

    for i in range(0, img.width, tile_dim):
        for j in range(0, img.height, tile_dim):
            l = i
            r = i + tile_dim
            u = j
            d = j + tile_dim
            sub_img = img.crop((l, u, r, d))
            
            color = get_avg_color(sub_img)

            best_tile_i = find_min_dist(color, tiles)
            tile = tiles[best_tile_i]
            dest.paste(tile['img'], (i, j))
    return dest

# Configurations
SOURCE_IMG_DIM = 16  # the dimension of the source images
OUTPUT_IMG_RATIO = 64  # the ratio of output image dimension to source image dimension
FORMAT = 'YCbCr'  # The comparison format

tiles = []

for (dirpath, _, filenames) in os.walk('source'):
    for filename in filenames:
        path = os.path.join(dirpath, filename)
        img = get_square_img(path, (SOURCE_IMG_DIM, SOURCE_IMG_DIM), FORMAT)
        tiles.append({ "color": get_avg_color(img), "img": img })
len(tiles)

for (dirpath, _, filenames) in os.walk('source'):
    for filename in filenames:
        path = os.path.join(dirpath, filename)
        target = Image.open(path).resize((SOURCE_IMG_DIM*OUTPUT_IMG_RATIO,SOURCE_IMG_DIM*OUTPUT_IMG_RATIO)).convert(FORMAT)
        res = make_mosaic(target, tiles).convert('RGB')
        res.save(os.path.join('output', filename))

