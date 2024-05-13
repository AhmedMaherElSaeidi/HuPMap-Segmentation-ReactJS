# HuBMAP - Hacking the Human Vasculature (FrontEnd implementation using ReactJS)

## Description
The goal is to segment instances of microvascular structures, including capillaries, arterioles, and venules, to automate the segmentation of microvasculature structures to improve researchers' understanding of how the blood vessels are arranged in human tissues.

## Pages
- **Home Page**: This page contains project details and introduces team members.
- **Prediction Page**: To upload an image and its corresponding mask. After submission, the backend processes the data and returns four images: the original image, the true mask, the predicted mask, and an overlaid mask. Additionally, users receive IOU and Dice scores as indicators of segmentation accuracy.
  
## Backend Repository
[HuPMap-Segmentation-Flask](https://github.com/AhmedMaherElSaeidi/HuPMap-Segmentation-Flask)
