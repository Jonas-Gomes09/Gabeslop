# 🚀 Gabeslop

Esta API é feita somente para fins de estudo, e não é um produto real. há inclusive funções reais de compra nem venda
O código, a logo e a empresa do website foram criados por nós (Jonas Gomes, Rafael Dias, Victor Gabriel e João Marvin). A empresa e produtos do website são totalmente fictícios.

## 📄 Dependências:

- NPM install
- NPM run dev

---

## 👷 Executando o código:
1. executar código
```
npm install
```

2. Executar código
```
npm run dev
```
3. Abrir o servidor rodando localmente

### Acessando o website

**Acessar no dispositivo em que o código está sendo executado**  
Você pode acessar digitando ou "http://0.0.0.0:3000" ou "http://localhost:3000" ou "http://{IPv4 do dispositivo executando o servidor}:3000" no navegador enquanto o código está sendo executado

**Acessar em outro dispositivo na rede local (LAN)<sup>1</sup>**  
Certifique-se de que tanto o dispositivo executando o servidor quanto o dispositivo que irá acessá-lo estão conectados e na mesma internet (ou conectados via uma VPN). Para acessar você digita "http://{IPv4 do dispositivo executando o servidor}:3000" no navegador enquanto o código está sendo executado, também pode ser acessado em navegadores para celular<sup>2</sup>

1. Caso você não queira que o site possa ser acessado por outros dispositivos na rede altere a linha contendo "export const HOST = '0.0.0.0'" de ./src/variables/index.ts para:
```
export const HOST = 'localhost'
```
2. Dependendo do modelo pode ser que algumas partes do site fiquem cortadas, o CSS foi adaptado para o Samsung Galaxy A36 e não foi testado em outros modelos.


##
### Descobrindo o IPv4 do dispositivo executando o servidor

**Windows (CMD ou PowerShell):**
```
ipconfig
```
Use o IPv4 do dispositivo de wi-fi que está conectado a internet.  
Resposta esperada:  
Adaptador de Rede sem Fio Wi-Fi (este nome pode mudar):

[...]
Endereço IPv4. . . . . . . .  . . . . . . . : {IPv4}

**Linux (Bash):**
```
ip addr show | grep "inet "
```
Use o IPv4 do dispositivo de wi-fi que está conectado a internet.  
Resposta esperada:  
inet {IPv4} [...] scope global ethX (ou wlanX)  

**MacOS (também serve no Linux):**
```
ifconfig
```
Use o IPv4 do dispositivo de wi-fi que está conectado a internet.  
Resposta esperada:  
ethX (ou enX): [...]  
        inet {IPv4}...