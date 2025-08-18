import { Form, Input } from './index'

export const ContentFormCard = () => {
  return (
    <Form>
      <Input type="text" name="name" placeholder="RBC">
        Entidad Financiera:
      </Input>
      <Input type="date" name="date_end">
        Fecha fin del ciclo
      </Input>
      <Input type="number" name="capacity" placeholder="5000">
        Cupo
      </Input>
      <Input type="color" name="color" placeholder="#000000">
        Color tarjeta
      </Input>
    </Form>
  )
}