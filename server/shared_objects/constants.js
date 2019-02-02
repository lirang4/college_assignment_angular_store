const brand = {
    enum: ["Apple", "LG", "OnePlus", "Xiomi"],
};
const colors = { 
     enum: ["Black", "Blue", "Red", "Pink", "Gray"],
};
const memory_capacity = {
    enum: ["256", "128", "64", "32", "16"],
};
const screen_size = {
    enum: ["5.8", "5.5", "6", "4.7", "5", "6.9","4","5.9","6.4"],
};
const screen_type = {
    enum: ["IPS", "LCD", "LED", "PLS", "TFT","Super ALMOD"]
};
const generation = {
    enum: ["2", "3", "3.5", "4"],
};
const ram = {
    enum: ["2", "3", "4", "6", "8"],
};

module.exports = {
    brand : brand,
    colors : colors,
    memory_capacity : memory_capacity,
    screen_size : screen_size,
    screen_type : screen_type,
    generation : generation,
    ram : ram
}