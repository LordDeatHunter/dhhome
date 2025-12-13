---
title: 'Imaginenc'
summary: 'Tool for converting files to images and back.'
img: 'assets/imaginenc.png'
technologies: [ Python ]
link: https://pypi.org/project/imaginenc/
source: https://github.com/LordDeatHunter/Imaginenc
---

While working on an [ARG](https://en.wikipedia.org/wiki/Alternate_reality_game), I got the idea of encoding data into
images, specifically in the RGB values of the pixels.\
I experimented with different methods of encoding, with the initial version (made in late 2017/early 2018) only being
able to encode text.

## Version 1 - "Base 79 Octillion"

When thinking of what I could do for the puzzle for the ARG, I kept thinking that what I was doing was too obvious, so I
decided to split the data (in this version, "data" only refers to text) into segments which would be encoded into
"chunks" of 2x2 pixels instead of a single pixel.

Since each pixel consists of 3 colors (RGB), and each color could have a value in the range of 0-255, that's 2<sup>
8</sup> possible values per color, or 2<sup>3\*8</sup> (2<sup>24</sup> = 16.7 million) possible values per pixel. Since
there were 4 pixels total in the 2x2 pixel chunk, that meant that each chunk would have 2<sup>4*24</sup> (or 2<sup>
96</sup>)
possible values, or 79 octillion possible values, which is where the name "Base 79 Octillion" comes from.

The image acted as a sort of "number base", where each 2x2 pixel chunk would represent a number in base 79 octillion.\
If you entered a number between 0 and 16.777.215 (2<sup>24</sup> - 1) into the program, it would convert it into a 2x2
image, where the bottom right pixel would be #FFFFFF (or 16.777.215 in decimal), and the other 3 pixels would be
#000000.\
If you increased the number by 1, it would overflow into the next pixel (it would go from #000000 to #000001), and the
bottom right pixel would be reset to #000000, and so on, with the largest number being 79 octillion - 1 (full white 2x2
square).

From there, the next step was working with larger numbers. This part was trivial, as it just involved dividing and
modding the number by 79 octillion, and then converting the result into multiple concatenated 2x2 pixel chunks.\
As for getting the decimal number from a provided text to use for encoding, the idea was similar: use the ASCII values
of
the characters, and convert them into a single number, which would then be converted into the 2x2 pixel chunks.\
For example, "b79oct" (98, 55, 57, 111, 99, 116) would be converted into the number 98\*256<sup>5</sup> + 55\*256<sup>4
</sup> + 57\*256<sup>3</sup> + 111\*256<sup>2</sup> + 99\*256 + 116 = 107.989.326.324.596, or as an image:

![b79oct](/assets/projects/imaginenc-b79oct.png)

Here's a 1-liner in Python for converting a string into a Base 10 number:

```python
string_value = "Example"
sum([ord(c) * 256 ** i for i, c in enumerate(reversed(string_value))])
```

## Version 2 - "Base 16 Million"

After the ARG, I continued working on the project. Using 2x2 pixel chunks was just a needless overcomplication, so
instead I switched to using a single pixel for each digit.\
This was simpler to implement as each ASCII character now perfectly fit into a single pixel, and after some
calculations, this was also the best "number base" in terms of efficiency, as it allowed for the most data to be stored
in a single image.

With this new version, however, came a new problem: each pixel was appended on the bottom of the previous one, which
would result in a 1-pixel wide image that was as tall as the number of characters in the text.\
This was not really a functional problem, but the goal was to also have the image be viewable.\
To get around this problem, I would look for the 2 largest factors below the square root of the number of
characters/pixels, and use those as the width and height of the image.\
For example, if the image had 1337 pixels, the size would be 7x191.

## Version 3 - "Imaginenc"

A while later, with the help of a friend, I decided to rewrite the project from scratch, as well as releasing it on
PyPI.\
The new approach was relatively similar, but the overall result was quite different.\
Instead of using text as an input, the program would now take a file, and go over each byte of the file, converting
groups of 3 bytes into a single RGB pixel, with each byte representing one of the colors.\
The image would be saved as a PNG file, and the program would also be able to convert the image back into the original
file.\
This new version also included some extra features, such as signing the image - hiding extra text in the image metadata.

The name "Imaginenc" is a portmanteau of "image" and "encode", with "encode" being shortened to "enc".

## Onwards

Not much work has been done ever since the creation of Imaginenc, though there are some obvious improvements that can be
made, such as making prime-factor images more square-like.

Contributions are always welcome ☺️