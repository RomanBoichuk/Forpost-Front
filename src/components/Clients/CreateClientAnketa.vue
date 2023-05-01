<template>
    <div class="client-anketa">
        <h1>Anketa</h1>
        <v-card class="mx-auto mt-6 client-anketa__form" max-width="900">
            <v-icon color="#213342" class="client-anketa__icon-close" @click="closeModal">
              mdi-close-circle
            </v-icon>
            <v-card-title class="text-h6 font-weight-regular justify-space-between pa-6">
                <span>{{ currentTitle }}</span>
                <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="step"></v-avatar>
            </v-card-title>

            <v-window v-model="step">
                <!-- КРОК 1 -->
                <!-- ПІБ та паспортні дані клієнта -->
                <v-window-item :value="1" class="pl-4 pr-4">
                  <v-form ref="form" v-model="validStep1">
                    <v-card outlined class="d-flex" height="560">
                        <!-- ПІБ Клієнта -->
                        <v-card outlined width="50%" class="pa-4">
                            <v-row>
                                <v-col>
                                   <v-text-field v-model="client_firstName"  :rules="[emptyValidation()]" label="Прізвище" height="3" outlined dense></v-text-field>
                                   <v-text-field v-model="client_secondName" :rules="[emptyValidation()]" label="Імя" outlined dense></v-text-field>
                                   <v-text-field v-model="client_surName" :rules="[emptyValidation()]" label="По батькові" outlined dense></v-text-field>
                                   <v-text-field v-model="client_IPN" :rules="[emptyValidation(), lengthValidation(10), numberValidation(), minLengthValidation(10)]" label="IPN" outlined dense></v-text-field>
                                   <v-text-field v-model="client_birthday" :rules="[emptyValidation(), doubleValidation()]" label="дата народження" outlined dense></v-text-field>
                                   <v-text-field v-model="client_birthdayPlace" :rules="[emptyValidation()]" label="місце народження" outlined dense></v-text-field>
                                   <v-text-field v-model="client_phone" :rules="[emptyValidation(), phoneNumberValidation(), lengthValidation(10)]" label="телефон" outlined dense></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card>
                        <v-spacer></v-spacer>
                        <!-- Паспортні дані клієнта -->
                        <v-card outlined width="50%" class="pa-4">
                            <p class="text-caption font-weight-bold text--black text-center mb-0">
                                Паспортні дані
                            </p>
                            <!-- Форма ЗВИЧАЙНОГО ПАСПОРТА -->
                            <v-radio-group v-model="passportType" row class="mt-0 pt-0">
                                <v-radio label="Паспорт" value="Паспорт"></v-radio>
                                <v-radio label="ID картка" value="ID картка"></v-radio>
                            </v-radio-group>
                            <div v-if="passportType === 'Паспорт'">
                                <div class="d-flex">
                                    <v-text-field v-model="passport_seria" :rules="[emptyValidation(), lengthValidation(2), minLengthValidation(2)]" label="Серія" height="3" outlined dense class="input-anketa__seria"></v-text-field>
                                    <v-text-field v-model="passport_number" :rules="[emptyValidation(), lengthValidation(6), numberValidation(), minLengthValidation(6)]" label="Номер" height="3" outlined dense></v-text-field>
                                </div>
                                <v-text-field v-model="passport_authority" :rules="[emptyValidation()]" label="ким виданий" height="3" outlined dense></v-text-field>
                                <v-text-field v-model="passport_issueDate" :rules="[emptyValidation(), doubleValidation()]" label="дата видачі" height="8" outlined dense class="input-anketa__date-passport"></v-text-field>
                            </div>
                            <!-- Форма ID ПАСПОРТА -->
                            <div v-else>
                                <div class="d-flex">
                                    <v-text-field v-model="passport_number" :rules="[emptyValidation(), lengthValidation(4), numberValidation(), minLengthValidation(4)]" label="Номер" height="3" outlined dense></v-text-field>
                                </div>
                                <v-text-field v-model="passport_authority" :rules="[emptyValidation(), lengthValidation(4), minLengthValidation(4), numberValidation()]" label="орган видачі" height="3" outlined dense></v-text-field>
                                <v-text-field v-model="passport_issueDate" :rules="[emptyValidation(), doubleValidation()]" label="дата видачі" height="8" outlined dense class="input-anketa__date-passport"></v-text-field>
                            </div>
                        </v-card>
                    </v-card>
                  </v-form>
                </v-window-item>

                <!-- КРОК 2 -->
                <!-- Місце проживання та реєстрації клієнта -->
                <v-window-item :value="2">
                  <v-form ref="form" v-model="validStep2">
                    <v-card outlined class="d-flex" height="560">
                        <!-- Місце реєстрації клієнта -->
                        <v-card outlined width="50%" class="pa-4">
                            <p class="text-caption font-weight-bold text--black text-left mb-0">
                                Місце реєстрації
                            </p>
                            <v-text-field v-model="registrationPlace_zipCode" :rules="[emptyValidation(), zipCodeValidation()]" label="Індекс" height="3" outlined dense class="input-anketa__seria"></v-text-field>
                            <v-text-field v-model="registrationPlace_region" :rules="[emptyValidation()]" label="Область" height="3" outlined dense></v-text-field>
                            <v-text-field v-model="registrationPlace_district" :rules="[emptyValidation()]" label="Район" height="3" outlined dense></v-text-field>
                            <v-text-field v-model="registrationPlace_city" :rules="[emptyValidation()]" label="Населений пункт" height="3" outlined dense></v-text-field>
                            <v-text-field v-model="registrationPlace_street" :rules="[emptyValidation()]" label="вулиця" height="3" outlined dense></v-text-field>
                            <div class="d-flex justify-space-between">
                                <v-text-field v-model="registrationPlace_house" :rules="[emptyValidation(), lengthValidation(6), numberValidation(), minLengthValidation(1)]" label="буд" height="3" outlined dense class="input-anketa__seria"></v-text-field>
                                <v-text-field v-model="registrationPlace_corps" :rules="[emptyValidation()]" label="корп" height="3" outlined dense class="input-anketa__seria"></v-text-field>
                                <v-text-field v-model="registrationPlace_room" :rules="[emptyValidation()]" label="кв" height="3" outlined dense class="input-anketa__seria"></v-text-field>
                            </div>
                        </v-card>
                        <v-spacer></v-spacer>
                        <!-- Місце проживання клієнта -->
                        <v-card outlined width="50%" class="pa-4">
                            <p class="text-caption font-weight-bold text--black text-left mb-0">
                                Місце проживання
                            </p>
                            <v-checkbox v-model="checked" label="Місце проживання співпадає з місцем реєстрації" hide-details class="pb-1 input-anketa__adress"></v-checkbox>
                            <v-text-field v-model="residencePlace_zipCode" :rules="[emptyValidation(), zipCodeValidation()]" label="Індекс" height="3" outlined dense class="input-anketa__seria"></v-text-field>
                            <v-text-field v-model="residencePlace_region" :rules="[emptyValidation()]" label="Область" height="3" outlined dense></v-text-field>
                            <v-text-field v-model="residencePlace_district" :rules="[emptyValidation()]" label="Район" height="3" outlined dense></v-text-field>
                            <v-text-field v-model="residencePlace_city" :rules="[emptyValidation()]" label="Населений пункт" height="3" outlined dense></v-text-field>
                            <v-text-field v-model="residencePlace_street" :rules="[emptyValidation()]" label="вулиця" height="3" outlined dense></v-text-field>
                            <div class="d-flex justify-space-between">
                                <v-text-field v-model="residencePlace_house" :rules="[emptyValidation(), lengthValidation(6), numberValidation(), minLengthValidation(1)]" label="буд" height="3" outlined dense class="input-anketa__seria"></v-text-field>
                                <v-text-field v-model="residencePlace_corps" :rules="[emptyValidation()]" label="корп" height="3" outlined dense class="input-anketa__seria"></v-text-field>
                                <v-text-field v-model="residencePlace_room" :rules="[emptyValidation()]" label="кв" height="3" outlined dense class="input-anketa__seria"></v-text-field>
                            </div>
                        </v-card>
                    </v-card>
                  </v-form>
                </v-window-item>

                <!-- Телефони контакних осіб та місце роботи -->
                <v-window-item :value="3">
                  <v-form ref="form" v-model="validStep3">
                    <v-card outlined class="d-flex" height="560">
                        <!-- Телефони контактних осіб -->
                        <v-card outlined width="50%" class="pa-4">
                            <p class="text-caption font-weight-bold text--black text-center mb-0">
                                телефони контакних осіб
                            </p>
                            <div class="d-flex justify-space-between">
                                <v-text-field v-model="contactPhone_personOne" :rules="[emptyValidation()]" label="ким приходиться" height="3" outlined dense class="input-anketa__seria">
                                </v-text-field>
                                <v-text-field v-model="contactPhone_one" :rules="[emptyValidation(), phoneNumberValidation(), lengthValidation(10)]" label="телефон" height="3" outlined dense></v-text-field>
                            </div>
                            <div class="d-flex justify-space-between">
                                <v-text-field v-model="contactPhone_personTwo" :rules="[emptyValidation()]" label="ким приходиться" height="3" outlined dense class="input-anketa__seria">
                                </v-text-field>
                                <v-text-field v-model="contactPhone_two" :rules="[emptyValidation(), phoneNumberValidation(), lengthValidation(10)]" label="телефон" height="3" outlined dense></v-text-field>
                            </div>
                            <div class="d-flex justify-space-between">
                                <v-text-field v-model="contactPhone_personThree" :rules="[emptyValidation()]" label="ким приходиться" height="3" outlined dense class="input-anketa__seria">
                                </v-text-field>
                                <v-text-field v-model="contactPhone_three" :rules="[emptyValidation(), phoneNumberValidation(), lengthValidation(10)]" label="телефон" height="3" outlined dense></v-text-field>
                            </div>
                        </v-card>
                        <v-spacer></v-spacer>
                        <!-- РОБОТА назва та адреса -->
                        <v-card outlined width="50%" class="pa-4">
                            <p class="text-caption font-weight-bold text--black text-left mb-0">
                                Місце роботи
                            </p>
                            <v-text-field v-model="jobName" :rules="[emptyValidation()]" label="Назва організації" height="3" outlined dense></v-text-field>
                            <v-text-field v-model="jobPosition" :rules="[emptyValidation()]" label="Посада" height="3" outlined dense></v-text-field>
                            <v-text-field v-model="jobAdress_zipCode" :rules="[emptyValidation(), zipCodeValidation()]" label="Індекс" height="3" outlined dense class="input-anketa__seria">
                            </v-text-field>
                            <v-text-field v-model="jobAdress_region" :rules="[emptyValidation()]" label="Область" height="3" outlined dense></v-text-field>
                            <v-text-field v-model="jobAdress_district" :rules="[emptyValidation()]" label="Район" height="3" outlined dense></v-text-field>
                            <v-text-field v-model="jobAdress_city" :rules="[emptyValidation()]" label="Населений пункт" height="3" outlined dense></v-text-field>
                            <v-text-field v-model="jobAdress_street" :rules="[emptyValidation()]" label="вулиця" height="3" outlined dense></v-text-field>
                            <div class="d-flex justify-space-between">
                                <v-text-field v-model="jobAdress_house" :rules="[emptyValidation(), lengthValidation(6), numberValidation(), minLengthValidation(1)]" label="буд" height="3" outlined dense class="input-anketa__seria">
                                </v-text-field>
                                <v-text-field v-model="jobAdress_corps" :rules="[emptyValidation()]" label="корп" height="3" outlined dense class="input-anketa__seria">
                                </v-text-field>
                                <v-text-field v-model="jobAdress_room" :rules="[emptyValidation()]" label="кв" height="3" outlined dense class="input-anketa__seria">
                                </v-text-field>
                            </div>
                        </v-card>
                    </v-card>
                  </v-form>
                </v-window-item>
            </v-window>

            <v-divider></v-divider>

            <!-- КНОПКИ -->
            <v-card-actions>
                <v-btn :disabled="step === 1" class="button__active:buttonActive" min-width= 110 text @click="step--, validStepBack()">
                    Back
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn v-if="step !== 3" :disabled= buttonDisabled color="primary" min-width= 110 depressed @click="step++, validStepNext()">
                    Next
                </v-btn>
                <v-btn v-else color="primary"   min-width= 110 depressed @click="createClient()">
                    СТВОРИТИ
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import {
  lengthValidation, emptyValidation, numberValidation,
  phoneNumberValidation, doubleValidation, minLengthValidation,
  zipCodeValidation
} from '../../../helpers/validators'

export default {
  name: 'ClientAnketa',
  components: {},
  data: () => ({
    buttonDisabled: true,
    lengthValidation,
    emptyValidation,
    numberValidation,
    phoneNumberValidation,
    doubleValidation,
    minLengthValidation,
    zipCodeValidation,
    passportType: 'Паспорт',
    checked: false,
    validStep1: false,
    validStep2: false,
    validStep3: false,
    step: 1,
    // КРОК 1
    client_firstName: '',
    client_secondName: '',
    client_surName: '',
    client_IPN: '',
    client_birthday: '',
    client_birthdayPlace: '',
    client_phone: '',
    passport_seria: '',
    passport_number: '',
    passport_authority: '',
    passport_issueDate: '',
    // КРОК 2 МІСЦЕ РЕЄСТРАЦІЇ
    registrationPlace_zipCode: '',
    registrationPlace_region: '',
    registrationPlace_district: '',
    registrationPlace_city: '',
    registrationPlace_street: '',
    registrationPlace_house: '',
    registrationPlace_corps: '',
    registrationPlace_room: '',
    // КРОК 2 МІСЦЕ ПРОЖИВАННЯ
    residencePlace_zipCode: '',
    residencePlace_region: '',
    residencePlace_district: '',
    residencePlace_city: '',
    residencePlace_street: '',
    residencePlace_house: '',
    residencePlace_corps: '',
    residencePlace_room: '',
    // КРОК 3  ТЕЛЕФОНИ КОНТАКТНИХ ОСІб
    contactPhone_personOne: '',
    contactPhone_personTwo: '',
    contactPhone_personThree: '',
    contactPhone_one: '',
    contactPhone_two: '',
    contactPhone_three: '',
    // КРОК 3  РОБОТА
    jobName: '',
    jobPosition: '',
    jobAdress_zipCode: '',
    jobAdress_region: '',
    jobAdress_district: '',
    jobAdress_city: '',
    jobAdress_street: '',
    jobAdress_house: '',
    jobAdress_corps: '',
    jobAdress_room: ''
  }),

  computed: {
    currentTitle () {
      switch (this.step) {
        case 1: return 'Персональні дані'
        case 2: return 'Місце проживання'
        default: return 'Телефон та місце роботи'
      }
    }
  },
  methods: {
    async createClient () {
      try {
        const clientContactsData = {
          client_firstName: this.client_firstName,
          client_secondName: this.client_secondName,
          client_surName: this.client_surName,
          client_IPN: this.client_IPN,
          client_birthday: this.client_birthday,
          client_birthdayPlace: this.client_birthdayPlace,
          client_phone: this.client_phone,
          PASSPORT: {
            passport_seria: this.passport_seria,
            passport_number: this.passport_number,
            passport_authority: this.passport_authority,
            passport_issueDate: this.passport_issueDate
          },
          // КРОК 2 МІСЦЕ РЕЄСТРАЦІЇ
          registrationPlace_zipCode: this.registrationPlace_zipCode,
          registrationPlace_region: this.registrationPlace_region,
          registrationPlace_district: this.registrationPlace_district,
          registrationPlace_city: this.registrationPlace_city,
          registrationPlace_street: this.registrationPlace_street,
          registrationPlace_house: this.registrationPlace_house,
          registrationPlace_corps: this.registrationPlace_corps,
          registrationPlace_room: this.registrationPlace_room,
          // КРОК 2 МІСЦЕ ПРОЖИВАННЯ
          residencePlace_zipCode: this.residencePlace_zipCode,
          residencePlace_region: this.residencePlace_region,
          residencePlace_district: this.residencePlace_district,
          residencePlace_city: this.residencePlace_city,
          residencePlace_street: this.residencePlace_street,
          residencePlace_house: this.residencePlace_house,
          residencePlace_corps: this.residencePlace_corps,
          residencePlace_room: this.residencePlace_room,
          // КРОК 3  ТЕЛЕФОНИ КОНТАКТНИХ ОСІб
          contactPhone_personOne: this.contactPhone_personOne,
          contactPhone_personTwo: this.contactPhone_personTwo,
          contactPhone_personThree: this.contactPhone_personThree,
          contactPhone_one: this.contactPhone_one,
          contactPhone_two: this.contactPhone_two,
          contactPhone_three: this.contactPhone_three,
          // КРОК 3  РОБОТА
          jobName: this.jobName,
          jobPosition: this.jobPosition,
          jobAdress_zipCode: this.jobAdress_zipCode,
          jobAdress_region: this.jobAdress_region,
          jobAdress_district: this.jobAdress_district,
          jobAdress_city: this.jobAdress_city,
          jobAdress_street: this.jobAdress_street,
          jobAdress_house: this.jobAdress_house,
          jobAdress_corps: this.jobAdress_corps,
          jobAdress_room: this.jobAdress_room
        }
        await this.$http.post('/clients', clientContactsData)
        this.$router.push('/clients')
      } catch (err) {
        console.log(err)
      }
    },
    closeModal () {
      this.$router.push('/clients')
    },
    validStepNext () {
      if (this.step === 2 && this.validStep2 === true) {
        this.buttonDisabled = false
      } else if (this.step === 3 && this.validStep3 === true) {
        this.buttonDisabled = false
      } else {
        this.buttonDisabled = true
      }
    },
    validStepBack () {
      this.buttonDisabled = false
    }
  },
  watch: {
    checked (newValue) {
      if (newValue === true) {
        this.residencePlace_zipCode = this.registrationPlace_zipCode
        this.residencePlace_region = this.registrationPlace_region
        this.residencePlace_district = this.registrationPlace_district
        this.residencePlace_city = this.registrationPlace_city
        this.residencePlace_street = this.registrationPlace_street
        this.residencePlace_house = this.registrationPlace_house
        this.residencePlace_corps = this.registrationPlace_corps
        this.residencePlace_room = this.registrationPlace_room
      } else {
        this.residencePlace_zipCode = ''
        this.residencePlace_region = ''
        this.residencePlace_district = ''
        this.residencePlace_city = ''
        this.residencePlace_street = ''
        this.residencePlace_house = ''
        this.residencePlace_corps = ''
        this.residencePlace_room = ''
      }
    },
    validStep1 (newValue) {
      if (this.validStep1 === true) {
        this.buttonDisabled = false
        this.validCaunter++
      } else {
        this.buttonDisabled = true
      }
    },
    validStep2 (newValue) {
      if (this.validStep2 === true) {
        this.buttonDisabled = false
        this.validCaunter++
      } else {
        this.buttonDisabled = true
      }
    },
    validStep3 (newValue) {
      if (this.validStep3 === true) {
        this.buttonDisabled = false
        this.validCaunter++
      } else {
        this.buttonDisabled = true
      }
    }
  }
}
</script>

<style scoped lang="scss">
.client-anketa {
  &__form {
    position: relative;
  }
  &__icon-close {
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(50%) translateY(-50%);
    font-size: 45px;
  }
}
.input-anketa{
    &__seria{
        max-width: 120px;
    }
    &__date-passport{
        max-width: 180px;
    }
    &__adress{
        margin-bottom: 18px;
    }
}

.btn-action {
    min-width: 110px;
}
</style>
