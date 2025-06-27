<?php

namespace App\Notifications;

use App\Models\Pedido;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue; // opcional
use Illuminate\Notifications\Messages\MailMessage;

class PedidoActualizado extends Notification
{
    use Queueable;

    protected $pedido;

    public function __construct(Pedido $pedido)
    {
        $this->pedido = $pedido;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('📦 Tu pedido ha sido actualizado')
            ->greeting('Hola ' . $notifiable->name)
            ->line("Tu pedido #{$this->pedido->id} ahora está en estado: {$this->pedido->estado}")
            ->line('Gracias por comprar con nosotros.');
    }
}
