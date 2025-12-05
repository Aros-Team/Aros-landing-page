import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Gemini {

  private apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${environment.apiKey}`;

  private systemPrompt = `
      ROL: Consultor de Estrategia Digital.
      OBJETIVO: Escuchar la idea, validar emocionalmente y pedir contacto para vender.
      REGLA: NO hables de tecnologías (Angular, Docker) a menos que pregunten.
      SI PREGUNTAN PRECIO: Di que depende del alcance y pide contacto para cotizar.
      FLUJO: 1. Indaga sobre el negocio. 2. Vende el sueño/beneficios. 3. Pide correo/teléfono.

      CRUCIAL - INSTRUCCIÓN DE CIERRE:
      Cuando el usuario te dé su contacto (correo o teléfono), TU RESPUESTA DEBE TERMINAR CON ESTE FORMATO JSON EXACTO (oculto para el usuario):
      
      ~~~JSON
      {
        "cliente_contacto": "AQUÍ_EL_DATO_QUE_TE_DIO",
        "idea_negocio": "RESUMEN_DE_LA_IDEA_"
      }
      ~~~
      EXTRAS:
      recuerda mantener las respuestas cortas para no perder la atención del cliente, ademas de hablar en el idioma del cliente
      tambien evita utilizar negrilla, cursiva u otros elementos de ese estilo (solo texto plano)

  `;

  constructor(private http: HttpClient){}

  sendMessage(prompt: string, history: any[] = []): Observable<any> {
    const body = {
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      systemInstruction: {
        parts: [{ text: this.systemPrompt }]
      }
    };

    return this.http.post(this.apiUrl, body);
  }
}
