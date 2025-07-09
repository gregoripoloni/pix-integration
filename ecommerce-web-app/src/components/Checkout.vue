<script setup>
import { ref, computed } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'

const emit = defineEmits(['confirm'])

const cartItems = ref([
  {
    id: 1,
    name: 'Headphone Wireless Bluetooth',
    price: 89.99,
    quantity: 1,
    image: 'https://lojamultilaser.vtexassets.com/arquivos/ids/1260086/15226_00.jpg?v=638599033045500000/80x80'
  },
  {
    id: 2,
    name: 'Capa de Celular',
    price: 24.99,
    quantity: 2,
    image: 'https://iwillstore.com.br/cdn/shop/files/double_case_para_iphone_14_pro_azul_marinho_capa_antichoque_dupla_1177_1_ebdbd5f0f7ea4c417b97bdc5a6050bb5.jpg?v=1721232122/80x80'
  },
  {
    id: 3,
    name: 'Cabo USB-C',
    price: 12.99,
    quantity: 1,
    image: 'https://waz.vtexassets.com/arquivos/ids/219891-800-auto?v=637925391151930000&width=800&height=auto&aspect=true/80x80'
  }
])

const handlingPayment = ref(false)

const tax = ref(0)
const shipping = ref(15)

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const total = computed(() => {
  return subtotal.value + shipping.value + tax.value
})

const handlePayment = () => {
  handlingPayment.value = true
  emit('confirm', total.value)
}
</script>

<template>
  <div class="h-full bg-gray-50 p-8 m-4 rounded-xl">
    <div class="container mx-auto px-4 max-w-4xl">
      <div class="text-center mb-8">
        <i class="pi pi-receipt !text-3xl text-green-600 mb-2"></i>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Finalizar Compra</h1>
        <p class="text-gray-600">Revise seus itens e confirme o pagamento</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card class="!shadow-none">
          <template #title>
            <div class="flex items-center gap-2">
              <i class="pi pi-shopping-cart text-green-600"></i>
              <span class="text-lg font-semibold">Seus Itens</span>
            </div>
          </template>
          <template #content>
            <div class="space-y-2">
              <div v-for="item in cartItems" :key="item.id" class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <img :src="item.image" :alt="item.name" class="w-16 h-16 rounded-lg object-cover">
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900">{{ item.name }}</h4>
                  <p class="text-sm text-gray-500">Quantidade: {{ item.quantity }}</p>
                  <p class="text-sm font-medium text-gray-900">R$ {{ (item.price * item.quantity).toFixed(2) }}</p>
                </div>
              </div>
            </div>
          </template>
        </Card>

        <Card class="!shadow-none">
          <template #title>
            <div class="flex items-center gap-2">
              <i class="pi pi-credit-card text-green-600"></i>
              <span class="text-lg font-semibold">Resumo do Pagamento</span>
            </div>
          </template>
          <template #content>
            <div class="space-y-2 mb-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Subtotal</span>
                <span class="text-gray-900">R$ {{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Frete</span>
                <span class="text-gray-900">{{ shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}` }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Taxa</span>
                <span class="text-gray-900">R$ {{ tax.toFixed(2) }}</span>
              </div>
              <div class="border-t pt-3 border-gray-100">
                <div class="flex justify-between text-lg font-bold">
                  <span class="text-gray-900">Total</span>
                  <span class="text-gray-900">R$ {{ total.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <div class="p-4 bg-sky-50 border border-sky-200 rounded-lg mb-4">
              <div class="flex items-start gap-2">
                <i class="pi pi-info-circle  text-sky-600 mt-0.5"></i>
                <div>
                  <p class="text-sky-800 text-sm">Método de pagamento:</p>
                  <p class="font-semibold text-sky-800 text-sm">Pix</p>
                </div>
              </div>
            </div>

            <Button
              @click="handlePayment"
              label="Confirmar Pagamento"
              icon="pi pi-check"
              class="w-full"
              size="large"
              :loading="handlingPayment"
            />
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
