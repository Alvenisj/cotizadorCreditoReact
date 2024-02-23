
const formatearDinero = ( valor ) => {

    const formatear = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'CRC'
    });

    return formatear.format( valor );

}


const calcularTotalPagar = ( cantidad, plazo ) => {
   
    let total;

    // Mientra mayor es la cantidad, menor es el interes
    if( cantidad < 100000 ) {
        total = cantidad * 1.5;
    } else if( cantidad >= 100000 && cantidad < 1000000 ) {
        total = cantidad * 1.4;
    } else if( cantidad >= 1000000 && cantidad < 10000000 ) {
        total = cantidad * 1.3;
    } else {
        total = cantidad * 1.2;
    }

    // plazo; si el plazo es mayor, entonces se cobra más interes 
    if( plazo === 6 ) {
        total *= 1.1;
    } else if( plazo === 12 ) {
        total *= 1.2;
    } else if( plazo === 24 ) {
        total *= 1.3;
    } else {
        total *= 1.4;
    }

    return total;
}




export {

    formatearDinero,
    calcularTotalPagar
}