import { Form, Input } from './index'

export const ContentFormCategory = () => {
  return (
    <Form>
      <Input type="text" name="description" placeholder="Cafecito">
        Descripcion
      </Input>
      <Input type="number" name="amount" placeholder="20.00">
        Precio
      </Input>
    </Form>
  )
}