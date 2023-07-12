import React from 'react';

class Checkout extends React.Component {
  state = {
    fullName: '',
    email: '',
    cpf: '',
    telefone: '',
    cep: '',
    endereco: '',
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { fullName, email, cpf, telefone, cep, endereco } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Nome completo"
            name="fullName"
            value={ fullName }
            onChange={ this.handleChange }
            data-testid="checkout-fullname"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="checkout-email"
          />
          <input
            type="text"
            placeholder="CPF"
            name="cpf"
            value={ cpf }
            onChange={ this.handleChange }
            data-testid="checkout-cpf"
          />
          <input
            type="text"
            placeholder="Telefone"
            name="telefone"
            value={ telefone }
            onChange={ this.handleChange }
            data-testid="checkout-phone"
          />
          <input
            type="text"
            placeholder="CEP"
            name="cep"
            value={ cep }
            onChange={ this.handleChange }
            data-testid="checkout-cep"
          />
          <input
            type="text"
            placeholder="Endereço"
            name="endereco"
            value={ endereco }
            onChange={ this.handleChange }
            data-testid="checkout-address"
          />
        </form>
      </div>
    );
  }
}

export default Checkout;
