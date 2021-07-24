import axios from 'axios';

class PaymentService {
  constructor() {
    this.public_token = '84EFB588CFAD58116FC279590C81BD0C545F336110FB1023431C4E505AD10D83';
    this.address = {};
    this.card = {};
    this.user = {};
    this.creditCardHash = null;
    this.junoCredentials = {};
  }

  setCardDetails(card) {
    this.card = card;
  }

  setUserDetails(user) {
    this.user = user;
  }

  setAddressDetails(address) {
    this.address = address;
  }

  saveCreditCardHash(hash) {
    this.creditCardHash = hash;
  }

  async generateCardHash(window) {
    const checkout = new window.DirectCheckout(this.public_token, false);
    await checkout.getCardHash({
      cardNumber: this.card.cardNumber,
      holderName: this.card.cardName,
      securityCode: this.card.cardCvc,
      expirationMonth: this.card.cardExpiration.split('/')[0],
      expirationYear: this.card.cardExpiration.split('/')[1],
    },
      cardHash => this.saveCreditCardHash(cardHash),
      error => { throw error });
  }

  async signInAtJuno() {
    const dataString = 'grant_type=client_credentials';
    const url = 'https://sandbox.boletobancario.com/authorization-server/oauth/token';
    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic <basic-credentials>',
      },
      auth: {
        username: 'DQcBWh8S3ewNp9ZB',
        password: ',aS%xX?h>.(&3[&TO>D{JM.[C^,QmD{y',
      },
    };
    try {
      const response = await axios.post(url, dataString, options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async subscribePlan() {
    const monthDay = new Date().getDate();
    const url = 'https://sandbox.boletobancario.com/api-integration/subscriptions';
    const requestBody = {
      dueDay: monthDay,
      planId: 'pln_854A5E53AA2CAC31',
      chargeDescription: 'Inscrição em Plano Padrão',
      creditCardDetails: {
        creditCardHash: this.creditCardHash,
      },
      billing: {
        name: this.user.name,
        document: this.user.cnpj,
        email: this.user.email,
        address: {
          street: this.address.street,
          number: this.address.number,
          neighborhood: this.address.hood,
          city: this.address.city,
          state: this.address.uf,
          postCode: this.address.cep
        },
        phone: this.user.phoneNumber,
        notify: false
      }
    }
    const options = {
      headers: {
        Authorization: `Bearer ${this.junoCredentials.acess_token}`
      }
    };
    try {
      const response = await axios.post(url, requestBody, options);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new PaymentService();