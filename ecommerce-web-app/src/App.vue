<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import Checkout from "./components/Checkout.vue";
import PixPayment from "./components/PixPayment.vue";
import Success from "./components/Success.vue";
import { generatePix } from "./apis/payment-gateway.api";

const toast = useToast();

const qrCode = ref(null);
const paymentStatus = ref('pending');
const paymentId = ref(null);
const websocket = ref(null);

const connectWebSocket = () => {
  const wsUrl = 'ws://localhost:8080';

  try {
    websocket.value = new WebSocket(wsUrl);
    websocket.value.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleWebSocketMessage(data);
    };
    websocket.value.onclose = () => {
      setTimeout(connectWebSocket, 5000);
    };
  } catch (error) {
    console.error(error);
  }
};

const handleWebSocketMessage = (data) => {
  switch (data.event) {
    case 'pix.payment.simulated':
      if (data.data.pixId === paymentId.value) {
        paymentStatus.value = 'paid';
        toast.add({
          severity: 'success',
          summary: 'Pagamento confirmado',
          detail: 'O pagamento foi confirmado com sucesso',
          life: 100000
        });
      }
      break;
  }
};

const handleConfirm = async (amount) => {
  const response = await generatePix(amount, 'Compra no E-commerce');
  qrCode.value = response.data.brCodeBase64;
  paymentId.value = response.data.id;
  console.log('Payment ID:', paymentId.value);
};

onMounted(() => {
  connectWebSocket();
});

onUnmounted(() => {
  if (websocket.value) {
    websocket.value.close();
  }
});
</script>

<template>
  <Toast />
  <Transition
    enter-active-class="transition-opacity"
    leave-active-class="transition-opacity"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
    mode="out-in"
  >
    <Checkout v-if="!qrCode" @confirm="handleConfirm" />
    <PixPayment v-else-if="qrCode && paymentStatus === 'pending'" :qrCode="qrCode" />
    <Success v-else-if="paymentStatus === 'paid'" />
  </Transition>
</template>
