import { OptionCard } from './selectCard/SelectCard';

export const SelectForm = ({category}) => {
  switch (category) {

    case "expenses":
      return (
        <>
          <label className="select">
            <span className="label">Categoría</span>
            <select name="category">
              <option value="" disabled>Seleccione</option>
              <option value="mercado">Mercado</option>
              <option value="carro">Carro</option>
              <option value="restaurante">Restaurante</option>
              <option value="otro">Otro</option>
            </select>
          </label>
          <label className="select">
            <span className="label">Tarjeta</span>
            <select className="select w-[50%]" name="card">
              <OptionCard/>
            </select>
          </label>
        </>
      );

    case "savings":
      return (
        <>
          <label className="select">
            <span className="label">Categoría</span>
            <select name="category" >
              <option value=""  disabled>Seleccione</option>
              <option value="ahorro">Ahorro</option>
              <option value="inversion">Inversión</option>
            </select>
          </label>
          <label className="select">
            <span className="label">Cuenta</span>
            <select className="select w-[50%]" name="card">
              <option value="" disabled>Seleccione</option>
              <option value="dejardins">Fondos Mutuos RBC</option>
              <option value="cibc">Fondos Mutuos CIBC</option>
            </select>
          </label>
        </>
      );

    case "income":
      return (
        <>
          <label className="select">
            <span className="label">Categoría</span>
            <select name="category">
              <option value=""  disabled>Seleccione</option>
              <option value="salario">Salario</option>
              <option value="bonos">Bonos</option>
              <option value="impuestos">Impuestos</option>
            </select>
          </label>
          <label className="select">
            <span className="label">Cuenta</span>
            <select className="select w-[50%]" name="card">
              <option value="" disabled>Seleccione</option>
              <option value="dejardins">RBC</option>
              <option value="cibc">CIBC</option>
            </select>
          </label>
        </>
      );
      
    default:
      break;
    }
  }
