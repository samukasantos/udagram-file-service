import { exception } from 'console';
import fs from 'fs';
import Jimp = require('jimp');

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(base64str: string): Promise<string>{
    return new Promise( async resolve => {
        const buf = Buffer.from(base64str, 'base64');
        const photo = await Jimp.read(buf);
        
        const outpath = '/tmp/filtered.' + Math.floor(Math.random() * 2000) + '.jpg';
        await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname+outpath, (img)=>{
            resolve(__dirname+outpath);
        });
    });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(directory: String, files:Array<string>){
    for( let file of files) {
        console.log(directory + file)
        fs.unlinkSync(directory + file);
    }
}

export function readFilesFromDirectory(directory : any){
    fs.readdir(directory, (err, files) => {
        deleteLocalFiles(directory, files)
      });
}


export function isValidURL(value : String) {
    var res = value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };