# Cloudflare Images Uploader

## Description

An uploader tool used to bulk upload image files from a local directory to Cloudflare's Images CDN product.

![Alt text](https://imagedelivery.net/ra500NQoeUq2mHNe2TetzA/1213cfa9-8cb2-4f17-05c9-94702edf2900/public)

### How it works

1. The local directory is read, and a recursive JSON object is created based on the files and sub folders in the directory.
2. The multi-level object is then converted to a flat list
3. This local flat list is then compared to the flat list of the images in Firebase
4. If the local images don't exist in Firebase, upload them. If Firebase contains images that aren't there locally, delete them. This in turn allows for renames, as a rename is simply a delete and upload with the new file name.
5. The images are either uploaded or deleted from Cloudflare via the Cloudflare API.
6. Firebase is then overwritten with the local images JSON object (called the manifest).

## Installation

Steps to install and set up the image uploader locally.

1. Clone the repository to your local machine.
2. Run `npm install` from the root of the project directory.
3. Copy the `.env_sample` file and rename it to `.env` - fill out the file accordingly.
4. Download your `serviceAccountKey.json` file from Firebase and add it to the root of the project.

## Usage

Steps on how to use the image uploader

1. Run `npm start "path\to\local\images"` to begin the upload
2. Find that a `manifest.json` file is created in the root of the project containing all of the found images and maintaining the directory structure of the input path.
