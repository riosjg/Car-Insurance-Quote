export function getYearDifference(year){
    return new Date().getFullYear() - year;
}

export function calculateBrand(brand){
    let increment;
    switch(brand){
        case 'european':
            increment = 1.3;
            break;
        case 'american':
            increment = 1.15;
            break;
        case 'asian':
            increment = 1.05;
            break;
        default:
            break;
    }
    return increment;  
}

export function calculatePlan(plan){
    if(plan==='basic'){
        return 1.2;
    }else{
        return 1.5;
    }
}

export function firstCapital(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
}