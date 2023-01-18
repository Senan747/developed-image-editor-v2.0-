const file_input = document.querySelector(".file-input");
const choose_img_btn = document.querySelector(".choose-img");
const first_img = document.querySelector(".first-img img");
const filter_options = document.querySelectorAll(".filter button");
const filter_name = document.querySelector(".filter-info .name");
const filter_slider = document.querySelector(".slider input");
const filter_value = document.querySelector(".filter-info .value");
const rotate_options = document.querySelectorAll(".rotate button");
const reset_filter_btn = document.querySelector(".reset-filter");
const save_image_btn = document.querySelector(".save-img");
let brightness = 100, saturation = 100, inversion = 0, grayscale = 0, blur = 0;
let rotate = 0, flip_horizontal = 1, flip_vertical = 1;

const apply_filters = () => {
    first_img.style.filter =`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) blur(${blur}px)`;
    first_img.style.transform = `rotate(${rotate}deg) scale(${flip_horizontal}, ${flip_vertical})`;
};

const loadImage = () => {
    let file = file_input.files[0];  //Retrieving a file chosen by the user
    if(!file) return; //Returning if no file has been selected
    first_img.src = URL.createObjectURL(file); //Passing the file URL as the initial image source

    first_img.addEventListener("load", () => {
        reset_filter_btn.click();
        document.querySelector(".container").classList.remove("disable"); //Once a photo has been added, the user can utilize various buttons, etc.
    });
    filter_options.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filter_name.innerText = option.innerText //change the filter name when one of four buttons is clicked
         
        if(option.id === "brightness"){
            filter_slider.value = brightness
            filter_value.innerText = `${brightness}%`;
        } else if(option.id === "saturation"){
            filter_slider.value = saturation
            filter_value.innerText = `${saturation}%`
        } else if(option.id === "inversion"){
            filter_slider.value = inversion;
            filter_value.innerText = `${inversion}%`
        } else if(option.id === "grayscale"){
            filter_slider.value = grayscale;
            filter_value.innerText = `${grayscale}%`
        }  else if(option.id === "blur"){
            filter_slider.value = blur;
            filter_value.innerText = `${blur}px`
        }
            });
        });
}

const updateFilter = () =>{
    filter_value.innerText = `${filter_slider.value}%`;
    const selected_filter = document.querySelector(".filter .active") //Retrieving the selected filter button

    if(selected_filter.id === "brightness"){
        brightness = filter_slider.value;
    } else if(selected_filter.id === "saturation"){
        saturation = filter_slider.value;
    } else if(selected_filter.id === "inversion"){
        inversion = filter_slider.value;
    } else if(selected_filter.id === "grayscale"){
        grayscale = filter_slider.value;
    }
    else if(selected_filter.id === "blur"){
        blur = filter_slider.value;
    }

    apply_filters();
} 

rotate_options.forEach(option => {
    option.addEventListener("click", () => { //Add a click event to all rotation buttons
        if(option.id === "left"){
            rotate -= 90; //if clicked btn is left rotate, decrement rotate value by -90
        } else if(option.id === "right"){
            rotate += 90;
        } else if(option.id === "horizontal"){
            if(flip_horizontal === 1){
                flip_horizontal = -1;
            }
            else if(flip_horizontal === -1){
                flip_horizontal = 1;
            }
        } else if(option.id === "vertical"){
            if(flip_vertical === 1){
                flip_vertical = -1;
            } else if(flip_vertical === -1){
                flip_vertical = 1;
            }
        }
        apply_filters();
    });
});

const reset_filter = () => {
    //default filters
    brightness = 100, saturation = 100, inversion = 0, grayscale = 0, blur = 0;
    rotate = 0, flip_horizontal = 1, flip_vertical = 1;
    filter_options[0].click();
    apply_filters();
}

const save_img = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");   //info about photo
    canvas.width = first_img.naturalWidth; 
    canvas.height = first_img.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) blur(${blur}px`;
    ctx.translate(canvas.width / 2, canvas.height / 2); //translating canvas from center
    if(rotate !== 0){
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flip_horizontal, flip_vertical);
    ctx.drawImage(first_img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "image.jpg"
    link.href = canvas.toDataURL();
    link.click();
}
   
choose_img_btn.addEventListener('click', () => file_input.click());
filter_slider.addEventListener("input", updateFilter);
file_input.addEventListener("change", loadImage);
reset_filter_btn.addEventListener("click", reset_filter);
save_image_btn.addEventListener("click", save_img);
