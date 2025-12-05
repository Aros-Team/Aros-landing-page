import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Gemini } from '../services/gemini';
import { EmailService } from '../services/email/email';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat {
  
  messages: { text: string; role: 'user' | 'bot' }[] = [];
  
  userMessage: string = '';

  isLoading: boolean = false;

  toggle: boolean = false;
  
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(private geminiService: Gemini, private emailService: EmailService) {}

  scrollToBottom(): void {
    requestAnimationFrame(() => {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    });
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;

    const prompt = this.userMessage;
    this.messages.push({ text: prompt, role: 'user' });
    this.scrollToBottom()
    this.userMessage = ''; 
    this.isLoading = true;

    const historyForApi = this.messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    this.geminiService.sendMessage(prompt, historyForApi).subscribe({
      next: (response) => {
      let fullText = response.candidates[0].content.parts[0].text;
      let textToShow = fullText;

      const jsonMatch = fullText.match(/~~~JSON\s*([\s\S]*?)\s*~~~/);

      if (jsonMatch) {
        try {
          const leadData = JSON.parse(jsonMatch[1]);
          
          console.log("información de contacto obtenida");
          this.emailService.sendLead(leadData);

          textToShow = fullText.replace(jsonMatch[0], '').trim();
        } catch (e) {
          console.error("Error al leer la nota secreta:", e);
        }
      }
      
      this.isLoading = false;
      this.messages.push({ text: textToShow, role: 'bot' });
      this.scrollToBottom()
    },
      error: (err) => {
        console.error('Error al hablar con Gemini:', err);
        this.messages.push({ text: 'Lo siento, hubo un error de conexión.', role: 'bot' });
        this.isLoading = false;
      }
    });
  }
}