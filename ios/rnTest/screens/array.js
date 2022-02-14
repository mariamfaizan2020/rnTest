import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const array =
    [
        {
          "_id": "5c2b5ee372c1682f756a583c",
          "price": "45.00",
          "category": {
            "_id": "59833fc0c9aed82b701be683",
            "name": {
              "en": "nails",
              "pt": "Unhas"
            }
          },
          "__v": 0,
          "name": {
            "en": "☺ DEAL OF THE WEEK ☺ Gel Polish Hands + Gel Polish Feet",
            "pt": "☺ PROMOÇÃO DA SEMANA ☺       Verniz Gel Mãos + Verniz Gel Pés"
          },
          "orderNumber": 0,
          "active": true
        },
        {
          "_id": "609d04b2769e9513f08f52f2",
          "price": "72.00",
          "category": {
            "_id": "59834066c9aed82b701be688",
            "name": {
              "en": "body",
              "pt": "Corpo"
            }
          },
          "__v": 0,
          "name": {
            "en": "Laser Diode 3 Waves for Women - 3 ZONES (First weekend of each month) | 60min.",
            "pt": "Laser Diodo 3 Ondas Senhora - 3 ZONAS (Primeiro fim-de-semana de cada mês) | 60min."
          },
          "orderNumber": 0,
          "active": true
        },
        {
          "_id": "609d055c769e9513f08f52f6",
          "price": "85.00",
          "category": {
            "_id": "59834066c9aed82b701be688",
            "name": {
              "en": "body",
              "pt": "Corpo"
            }
          },
          "__v": 0,
          "name": {
            "en": " Laser Diode 3 Waves Man - 3 ZONES (First weekend of each month) | 60min.",
            "pt": "Laser Diodo 3 Ondas Homem - 3 ZONAS (Primeiro fim-de-semana de cada mês) | 60min."
          },
          "orderNumber": 0,
          "active": true
        },
        {
          "_id": "609d07fe769e9513f08f52f7",
          "price": "72.00",
          "category": {
            "_id": "59834066c9aed82b701be688",
            "name": {
              "en": "body",
              "pt": "Corpo"
            }
          },
          "__v": 0,
          "name": {
            "en": "Diamond Dermabrasion PostQuam (Peeling)",
            "pt": "Dermoabrasão Diamante PostQuam (Peeling) | 60min."
          },
          "orderNumber": 0,
          "active": true
        },
        {
          "_id": "5eb69c53fb0a827e89a47705",
          "price": "60.00",
          "category": {
            "_id": "59833fc0c9aed82b701be683",
            "name": {
              "en": "nails",
              "pt": "Unhas"
            }
          },
          "__v": 0,
          "name": {
            "en": "☺ DEAL OF THE WEEK ☺    Manicure + Pedicure + Treatment with Paraffin Wax (Hands and Feet)",
            "pt": "☺ PROMOÇÃO DA SEMANA  Manicure + Pedicure + Tratamento com Parafina (maõs e pés)"
          },
          "orderNumber": 1,
          "active": true
        },
        {
          "_id": "5eb6a0eafb0a827e89a47788",
          "price": "56.00",
          "category": {
            "_id": "59833fc0c9aed82b701be683",
            "name": {
              "en": "nails",
              "pt": "Unhas"
            }
          },
          "__v": 0,
          "name": {
            "en": "☺ DEAL OF THE WEEK ☺          Gel Hands + Pedicure",
            "pt": "☺ PROMOÇÃO DA SEMANA ☺          Gel Mãos + Pedicure"
          },
          "orderNumber": 2,
          "active": true
        },
        {
          "_id": "598d80af89a86b0e14585b97",
          "price": "16.00",
          "category": {
            "_id": "59833fc0c9aed82b701be683",
            "name": {
              "en": "nails",
              "pt": "Unhas"
            }
          },
          "__v": 0,
          "name": {
            "en": "Manicure   (Service only performed with another service) | 45min.",
            "pt": "Manicure (Verniz de Longa Duração) (Serviço apenas efetuado em conjunto com outro) | 45min."
          },
          "orderNumber": 3,
          "active": true
        },
        {
          "_id": "5e301737b2807c292c754060",
          "price": "30.00",
          "category": {
            "_id": "59833fc0c9aed82b701be683",
            "name": {
              "en": "nails",
              "pt": "Unhas"
            }
          },
          "__v": 0,
          "name": {
            "en": "Manicure + Treatment with Paraffin Wax | 75min.",
            "pt": "Manicure (Verniz de Longa Duração) + Tratamento com Parafina | 75min."
          },
          "orderNumber": 4,
          "active": true
        },
        {
          "_id": "5be56f4c02ccbb083d1ac6ce",
          "price": "8.00",
          "category": {
            "_id": "59834066c9aed82b701be688",
            "name": {
              "en": "body",
              "pt": "Corpo"
            }
          },
          "__v": 0,
          "name": {
            "en": "Waxing Lip                          (Service only performed with another service) | 10min.",
            "pt": "Epilação Cera Buço               (Serviço apenas efetuado em conjunto com outro) | 10min."
          },
          "orderNumber": 5,
          "active": true
        },
        {
          "_id": "5e32fa46543ca84bdbe3fc1a",
          "price": "12.00",
          "category": {
            "_id": "59834066c9aed82b701be688",
            "name": {
              "en": "body",
              "pt": "Corpo"
            }
          },
          "__v": 0,
          "name": {
            "en": "Epilation Lip Tweezer                       (Service only performed with another service) | 15min.",
            "pt": "Epilação Pinça Buço                    (Serviço apenas efetuado em conjunto com outro) | 15min."
          },
          "orderNumber": 6,
          "active": true
        },
        {
          "_id": "5e32f779543ca84bdbe3fb4b",
          "price": "10.00",
          "category": {
            "_id": "59834055c9aed82b701be686",
            "name": {
              "pt": "Sobrancelhas",
              "en": "eyebrows"
            }
          },
          "__v": 0,
          "name": {
            "en": "Epilation Waxing                       (Service only performed with another feet service) | 10min.",
            "pt": "Epilação Cera                   (Serviço apenas efetuado em conjunto com outro) | 10min."
          },
          "orderNumber": 7,
          "active": true
        },
        {
          "_id": "5d7e195590a4020f202f3802",
          "price": "15.00",
          "category": {
            "_id": "59833fc0c9aed82b701be683",
            "name": {
              "en": "nails",
              "pt": "Unhas"
            }
          },
          "__v": 0,
          "name": {
            "en": "Man Manicure                    (Service only performed with another service)  | 30min.",
            "pt": "Manicure Homem                      (Serviço apenas efetuado em conjunto com outro) | 30min."
          },
          "orderNumber": 8,
          "active": true
        },
        {
          "_id": "5a219467073a8e2df1571e12",
          "price": "22.00",
          "category": {
            "_id": "59833fc0c9aed82b701be683",
            "name": {
              "en": "nails",
              "pt": "Unhas"
            }
          },
          "__v": 0,
          "name": {
            "en": "Gel Polish Hands | 60min.",
            "pt": "Verniz Gel Mãos (Gelinho) | 60min."
          },
          "orderNumber": 9,
          "active": true
        },
        {
          "_id": "5e32fae1543ca84bdbe3fc1d",
          "price": "15.00",
          "category": {
            "_id": "59834066c9aed82b701be688",
            "name": {
              "en": "body",
              "pt": "Corpo"
            }
          },
          "__v": 0,
          "name": {
            "en": "Epilation Lip Threading                 (Service only performed with another service) | 15min.",
            "pt": "Epilação Linha Buço                 (Serviço apenas efetuado em conjunto com outro) | 15min."
          },
          "orderNumber": 10,
          "active": true
        },
        {
          "_id": "5ddfc3c6380ce72c4b90d8b5",
          "price": "50.00",
          "category": {
            "_id": "5983402ac9aed82b701be685",
            "name": {
              "en": "hair",
              "pt": "Cabelo"
            }
          },
          "__v": 0,
          "name": {
            "en": "☺ DEAL OF THE WEEK ☺                      Woman Haircut + Brushing",
            "pt": "☺ PROMOÇÃO DA SEMANA ☺                      Corte Senhora + Brushing"
          },
          "orderNumber": 13,
          "active": true
        },
        {
          "_id": "5be56f9202ccbb083d1ac6cf",
          "price": "10.00",
          "category": {
            "_id": "59834066c9aed82b701be688",
            "name": {
              "en": "body",
              "pt": "Corpo"
            }
          },
          "__v": 0,
          "name": {
            "en": "Waxing Eyebrows                            (Service only performed with another service) | 10min.",
            "pt": "Epilação Cera Sobrancelhas       (Serviço apenas efetuado em conjunto com outro) | 10min."
          },
          "orderNumber": 14,
          "active": true
        },
        {
          "_id": "5be56fb102ccbb083d1ac6d0",
          "price": "8.00",
          "category": {
            "_id": "59834066c9aed82b701be688",
            "name": {
              "en": "body",
              "pt": "Corpo"
            }
          },
          "__v": 0,
          "name": {
            "en": "Waxing Chin                          (Service only performed with another service) | 10min.",
            "pt": "Epilação Cera Queixo              (Serviço apenas efetuado em conjunto com outro) | 10min."
          },
          "orderNumber": 15,
          "active": true
        },
        {
          "_id": "5a21d276073a8e2df1571e15",
          "price": "26.00",
          "category": {
            "_id": "59833fc0c9aed82b701be683",
            "name": {
              "en": "nails",
              "pt": "Unhas"
            }
          },
          "__v": 0,
          "name": {
            "en": "Gel Polish Hands + Nail Art | 90min.",
            "pt": "Verniz Gel Mãos (Gelinho) + Nail Art | 90min."
          },
          "orderNumber": 17,
          "active": true
        },
        {
          "_id": "5a219558073a8e2df1571e13",
          "price": "36.00",
          "category": {
            "_id": "59833fc0c9aed82b701be683",
            "name": {
              "en": "nails",
              "pt": "Unhas"
            }
          },
          "__v": 0,
          "name": {
            "en": "Gel Hands | 90min.",
            "pt": "Gel Mãos | 90min."
          },
          "orderNumber": 18,
          "active": true
        },
        {
          "_id": "598d817289a86b0e14585b9c",
          "price": "50.00",
          "category": {
            "_id": "5983401dc9aed82b701be684",
            "name": {
              "en": "makeUp",
              "pt": "Maquilhagem"
            }
          },
          "__v": 0,
          "name": {
            "en": "Make Up - Natural | 45min.",
            "pt": "Make Up Natural | 45min."
          },
          "orderNumber": 19,
          "active": true
        }
      ]


export default array

const styles = StyleSheet.create({})