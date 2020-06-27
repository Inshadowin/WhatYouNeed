let obj = {
    discount: 10,
}

//export const obj;
export const lens = (propName) => {
    return {
        view: () => obj[propName],
        set: (value) => {
            if (value < 0 || value > 10) {
                return obj;
            }

            obj[propName] = value;
            return obj;
            // return {
            //     ...obj,
            //     [propName]: value
            // }
        }
    }
}

export const discount = lens('discount');

const lens1 = lens('discount');
lens1.set(100);

obj.discount = 100;