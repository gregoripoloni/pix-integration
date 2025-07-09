<script setup>
import Card from 'primevue/card'

defineProps({
  qrCode: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="h-full bg-gray-50 p-8 m-4 rounded-xl">
    <div class="container mx-auto px-4 max-w-4xl">
      <div class="text-center mb-8">
        <i class="pi pi-receipt !text-3xl text-green-600 mb-2"></i>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Finalizar Compra</h1>
        <p class="text-gray-600">Realize o pagamento do seu pedido com o QR Code abaixo</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card class="!shadow-none">
          <template #content>
            <img :src="qrCode" alt="QR Code" class="w-full h-auto" />
          </template>
        </Card>

        <Card class="!shadow-none">
          <template #title>
            <div class="flex items-center gap-2">
              <i class="pi pi-info-circle text-sky-600"></i>
              <span class="text-lg font-semibold">Como pagar com Pix</span>
            </div>
          </template>
          <template #content>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-6 h-6 mt-1 bg-sky-100 rounded-full flex items-center justify-center">
                  <span class="text-sky-600 text-sm">1</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Abra o app do seu banco</p>
                  <p class="text-sm text-gray-600">Acesse o aplicativo do seu banco ou instituição financeira</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-6 h-6 mt-1 bg-sky-100 rounded-full flex items-center justify-center">
                  <span class="text-sky-600 text-sm">2</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Escaneie o QR Code</p>
                  <p class="text-sm text-gray-600">Use a função "Pagar com Pix" e escaneie o código ao lado</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-6 h-6 mt-1 bg-sky-100 rounded-full flex items-center justify-center">
                  <span class="text-sky-600 text-sm">3</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Confirme o pagamento</p>
                  <p class="text-sm text-gray-600">Verifique os dados e confirme a transação</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-6 h-6 mt-1 bg-green-100 rounded-full flex items-center justify-center">
                  <i class="pi pi-check text-green-600 !text-xs"></i>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Pronto! Pagamento confirmado</p>
                  <p class="text-sm text-gray-600">Você receberá a confirmação por email</p>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <div class="mt-8 text-center">
        <p class="text-sm text-gray-500 mb-2">
          Precisa de ajuda? Entre em contato com nosso suporte em suporte@exemplo.com
        </p>
        <p class="text-xs text-gray-400">
          Seu pagamento é seguro e criptografado. Nunca armazenamos suas informações de pagamento.
        </p>
      </div>
    </div>
  </div>
</template>
