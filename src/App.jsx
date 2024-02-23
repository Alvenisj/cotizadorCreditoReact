
import { useState, useEffect } from 'react';

import Header from './components/Header';
import Button from './components/Button';
import { formatearDinero, calcularTotalPagar  } from './helpers';



function App() {
  
  // ESTADO QUE SE ENCARGA DE LA CANTIDAD DE LA INTERFAZ
  const [ cantidad, setCantidad ] = useState(5000000);
  // ESTADO QUE SE ENCARGA DE EL SELECT DEL PLAZO
  const [ meses, setMeses ] = useState( 6 );
  // ESTADO QUE SE ENCARGA DEL TOTAL
  const [ total, setTotal ] = useState( 0 );
  // ESTADO QUE SE ENCARGA DEL TOTAL A PAGAR MENSUAL
  const [ pago, setPago ] = useState( 0 );

  useEffect( ( ) => {
    const resultadoTotalPagar = calcularTotalPagar( cantidad, meses );
    setTotal( resultadoTotalPagar );

    // CALCULAR EL PAGO MENSUAL
    setPago( total / meses)
  }, [cantidad, meses, total ] );


  const MIN = 0;
  const MAX = 10000000;
  const STEP = 500;

  function handleChange( e ) {
   setCantidad( +e.target.value )
  }


  function handleOnclickDecremento( ) {
    const valor = cantidad - STEP;
    if( valor < MIN ) {
      alert('Cantidad no valida');
      return;
    }
    setCantidad( valor );
  }


  function handleOnclickIncremento( ) {
    const valor = cantidad + STEP;
    if( valor > MAX ) {
      alert('Cantidad no valida');
      return;
    }
    setCantidad( valor );
  }

    return (

          <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">     
                    {/* EL TÍTULO DE CABECERA */}
                    <Header />
                    {/* LOS DOS BOTONES DE - Y + */}
                    <div className='flex justify-between my-6'>
                          <Button
                              operador='-'
                              fn={handleOnclickDecremento}
                          />
                          <Button
                              operador='+'
                              fn={handleOnclickIncremento}
                          />
                    </div>
                  {/* EL INPUT RANGE QUE FUNCIONA COMO BARRA */}
                  <input 
                      type='range' 
                      className='w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600'
                      onChange={handleChange}
                      min={MIN}
                      max={MAX}
                      step={STEP}
                      value={cantidad}
                  />
                  {/* MUESTRA LA CANTIDAD EN LA INTERFAZ */}
                  <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">
                    { formatearDinero( cantidad ) } 
                  </p>
                  
                  <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
                    Elije un <span className='text-indigo-600'>Plazo</span>
                  </h2>

                  <select 
                      className='mt-5 w-full text-center text-gray-500 p-2 border border-gray-300 bg-gray-50 rounded-lg text-xl font-bold'
                      value={meses}
                      onChange={ e => setMeses(+e.target.value)}
                      >
                          <option>Seleccione el plazo</option>
                          <option value="6">6 Meses</option>
                          <option value="12">12 Meses</option>
                          <option value="24">24 Meses</option>
                          <option value="36">36 Meses</option>
                  </select>

                  <div className='my-5 space-y-3 bg-gray-500 rounded-lg p-5'>
                    <h2 className="text-2xl font-bold text-center text-white">Resumen<span className='text-lime-400'> de Pagos:</span></h2>
                    <p className='text-xl text-white text-center font-bold'>Crédito a:  {meses} Meses</p>
                    <p className='text-xl text-white text-center font-bold'> Total a Pagar: { formatearDinero(total) } </p>
                    <p className='text-xl text-white text-center font-bold'>Pagos Mensuales: { formatearDinero(pago) }</p>
                  </div>

          </div>
    )
}

export default App

