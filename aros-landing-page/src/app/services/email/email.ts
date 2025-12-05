import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser'; // 1. Importamos la librería
import { environment } from '../../../environments/environment.development'; // 2. Importamos tus claves

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  async sendLead(data: any): Promise<void> {
    try {
      const response = await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        data,
        environment.emailjs.publicKey
      );
      
      console.log('Correo enviado', response.status, response.text);
    } catch (error) {
      console.error('Fallo en el envio del correo: ', error);
      throw error;
    }
  }
}