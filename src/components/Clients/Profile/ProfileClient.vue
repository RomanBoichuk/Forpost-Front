<template>
  <div class="profile">
        <contract-aplication
          v-if="modalCardVisible"
          @closeModal="closeContractAplication"
          :clientDataProp="oneCreditClient"
        />
        <v-card class="mx-auto" max-width="1200">
            <div class="profile__header">
                <v-icon class="mr-3" large color="green darken-2" @click="changeClientData">
                    mdi-account-edit
                </v-icon>
                <doc-to-word :generalData="oneCreditClient"/>
            </div>
            <div class="profile__header-button pt-2 pb-2">
                <button class="btn btn-header" @click="showModalCard">NEW CONTRACT
                </button>
            </div>
            <v-card-title class="text-h6 font-weight-regular justify-center">
                <span>Профайл</span>
            </v-card-title>
            <v-container>
                <v-row>
                    <v-col cols="4" class="col-avatar">
                        <v-avatar size="300" rounded>
                          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                        </v-avatar>
                    </v-col>
                    <v-col>
                        <v-form ref="form">
                            <!-- <v-form ref="form" @submit.prevent="saveAvatar"> -->
                            <!-- --------------------------------------------- -->
                            <!-- РОЗДІЛ 1 -->
                            <!--Персональні дані клієнта, ПІБ, ІПН, тел -->
                            <div class="box">
                                <p class="text-h7">Персональні дані</p>
                                <!-- Прізвище імя по батькові -->
                                <div class="d-flex">
                                    <v-text-field
                                        :value="oneCreditClient.client_firstName"
                                        @input="inputFirstName"
                                        outlined
                                        :disabled="activelyСhange"
                                        dense
                                        hide-details="auto"
                                        class="pr-1"
                                        ></v-text-field>
                                    <v-text-field
                                        :value="oneCreditClient.client_secondName"
                                        @input="inputSecondName"
                                        outlined
                                        :disabled="activelyСhange"
                                        dense
                                        :flat="true"
                                        hide-details="auto"
                                        class="pl-1 pr-1"
                                    ></v-text-field>
                                    <v-text-field
                                        :value="oneCreditClient.client_surName"
                                        @input="inputSurName"
                                        outlined
                                        :disabled="activelyСhange"
                                        dense
                                        :flat="true"
                                        hide-details="auto"
                                        class="pl-1"
                                    ></v-text-field>
                                </div>
                                <!-- Ідентифікаційний код -->
                                <div class="d-flex align-center mt-4">
                                    <p class="mb-0 mr-1">IPN</p>
                                    <v-text-field
                                        :value="oneCreditClient.client_IPN"
                                        @input="inputIPN"
                                        outlined
                                        :disabled="activelyNotСhange"
                                        dense
                                        :flat="true"
                                        hide-details="auto"
                                        class="pl-1 pr-1 input__ipn"
                                    ></v-text-field>
                                </div>
                                <!-- дата народження -->
                                <div class="d-flex align-center mt-4">
                                    <p class="mb-0 mr-1">дата народження</p>
                                    <v-text-field
                                        :value="oneCreditClient.client_birthday"
                                        @input="inputBirthday"
                                        outlined
                                        :disabled="activelyСhange"
                                        dense
                                        :flat="true"
                                        hide-details="auto"
                                        class="pl-1 pr-1 input__birthday">
                                    </v-text-field>
                                </div>
                                <!-- телефони клієнта -->
                                <div>
                                    <div class="d-flex align-center mt-4">
                                        <p class="mb-0 mr-1">тел</p>
                                        <v-text-field
                                            :value="oneCreditClient.client_phone"
                                            outlined
                                            :disabled="activelyNotСhange"
                                            dense
                                            :flat="true"
                                            hide-details="auto"
                                            class="pl-1 pr-1 input__tel">
                                        </v-text-field>
                                    </div>
                                    <div class="d-flex align-center mt-4">
                                        <p class="mb-0 mr-1">тел</p>
                                        <v-text-field
                                            outlined
                                            :disabled="false"
                                            dense
                                            :flat="true"
                                            hide-details="auto"
                                            class="pl-1 pr-1 input__tel">
                                        </v-text-field>
                                    </div>
                                </div>
                            </div>
                            <!-- --------------------------------------------- -->
                            <!-- РОЗДІЛ 2 -->
                            <!-- Паспортні дані -->
                            <div class="box">
                                <p class="text-h7">Паспортні дані</p>
                                <!-- Серія та номер паспорту -->
                                <div class="d-flex align-center mt-4">
                                    <p class="mb-0 mr-1">cерія</p>
                                    <v-text-field
                                        :value="oneCreditClient.PASSPORT.passport_seria"
                                        @input="inputPassportSeria"
                                        outlined
                                        :disabled="activelyСhange"
                                        dense
                                        :flat="true"
                                        hide-details="auto"
                                        class="pl-1 pr-1 input__pasport-seria">
                                    </v-text-field>
                                    <p class="mb-0 mr-1">номер</p>
                                    <v-text-field
                                        :value="oneCreditClient.PASSPORT.passport_number"
                                        @input="inputPassportNumber"
                                        outlined
                                        :disabled="activelyСhange"
                                        dense
                                        :flat="true"
                                        hide-details="auto"
                                        class="pl-1 pr-1 input__birthday">
                                    </v-text-field>
                                </div>
                                <!-- орган видачі паспорту -->
                                <div class="d-flex align-center mt-4">
                                    <p class="mb-0 mr-1">ким виданий</p>
                                    <v-text-field
                                        :value="oneCreditClient.PASSPORT.passport_authority"
                                        @input="inputPassportAuthority"
                                        outlined
                                        :disabled="activelyСhange"
                                        dense
                                        :flat="true"
                                        hide-details="auto"
                                        class="pl-1">
                                    </v-text-field>
                                </div>
                                <!-- дата видочі паспорту -->
                                <div class="d-flex align-center mt-4">
                                    <p class="mb-0 mr-1">дата видачі</p>
                                    <v-text-field
                                        :value="oneCreditClient.PASSPORT.passport_issueDate"
                                        @input="inputPassportIssueDate"
                                        outlined
                                        :disabled="activelyСhange"
                                        dense
                                        :flat="true"
                                        hide-details="auto"
                                        class="pl-1 input__birthday">
                                    </v-text-field>
                                </div>
                            </div>
                            <!-- --------------------------------------------- -->
                            <!-- РОЗДІЛ 3 -->
                            <!-- Адреса проживання та реєстрації -->
                            <div class="box">
                                <div class="d-flex ml-n1 mr-n1">
                                    <!-- --------------------------------------------- -->
                                    <!-- Місце реєстрації -->
                                    <div class="box__content mr-1">
                                        <p class="text-h7">Місце реєстрації</p>
                                        <div class="d-flex align-center mt-4">
                                            <p class="mb-0 mr-1">Індекс</p>
                                            <v-text-field
                                                :value="oneCreditClient.registrationPlace_zipCode"
                                                @input="inputRegistrationPlaceZipCode"
                                                outlined
                                                :disabled="activelyСhange"
                                                dense
                                                :flat="true"
                                                hide-details="auto"
                                                class="pl-1 pr-1 input__birthday"
                                            ></v-text-field>
                                        </div>
                                        <div class="d-flex align-center mt-4">
                                            <p class="mb-0 mr-1">Область</p>
                                            <v-text-field
                                                :value="oneCreditClient.registrationPlace_region"
                                                @input="inputRegistrationPlaceRegion"
                                                outlined
                                                :disabled="activelyСhange"
                                                dense
                                                :flat="true"
                                                hide-details="auto"
                                                class="pl-1 pr-1"
                                            ></v-text-field>
                                        </div>
                                        <div class="d-flex align-center mt-4">
                                            <p class="mb-0 mr-1">Район</p>
                                            <v-text-field
                                                :value="oneCreditClient.registrationPlace_district"
                                                @input="inputRegistrationPlaceDistrict"
                                                outlined
                                                :disabled="activelyСhange"
                                                dense
                                                :flat="true"
                                                hide-details="auto"
                                                class="pl-1 pr-1"
                                            ></v-text-field>
                                        </div>
                                        <div class="d-flex align-center mt-4">
                                            <p class="mb-0 mr-1">Місто</p>
                                            <v-text-field
                                                :value="oneCreditClient.registrationPlace_city"
                                                @input="inputRegistrationPlaceCity"
                                                outlined
                                                :disabled="activelyСhange"
                                                dense
                                                :flat="true"
                                                hide-details="auto"
                                                class="pl-1 pr-1"
                                            ></v-text-field>
                                        </div>
                                        <div class="d-flex align-center mt-4">
                                            <p class="mb-0 mr-1">вулиця</p>
                                            <v-text-field
                                                :value="oneCreditClient.registrationPlace_street"
                                                @input="inputRegistrationPlaceStreet"
                                                outlined
                                                :disabled="activelyСhange"
                                                dense
                                                :flat="true"
                                                hide-details="auto"
                                                class="pl-1 pr-1"
                                            ></v-text-field>
                                        </div>
                                        <div class="d-flex align-center mt-4">
                                            <p class="mb-0 mr-1">буд</p>
                                            <v-text-field
                                                :value="oneCreditClient.registrationPlace_house"
                                                @input="inputRegistrationPlaceHouse"
                                                outlined
                                                :disabled="activelyСhange"
                                                dense
                                                :flat="true"
                                                hide-details="auto"
                                                class="pl-1 pr-1 input__pasport-seria">
                                            </v-text-field>
                                            <p class="mb-0 mr-1">корп</p>
                                            <v-text-field
                                                :value="oneCreditClient.registrationPlace_corps"
                                                @input="inputRegistrationPlaceCorps"
                                                outlined
                                                :disabled="activelyСhange"
                                                dense
                                                :flat="true"
                                                hide-details="auto"
                                                class="pl-1 pr-1 input__pasport-seria">
                                            </v-text-field>
                                            <p class="mb-0 mr-1">кв</p>
                                            <v-text-field
                                                :value="oneCreditClient.registrationPlace_room"
                                                @input="inputRegistrationPlaceRoom"
                                                outlined
                                                :disabled="activelyСhange"
                                                dense
                                                :flat="true"
                                                hide-details="auto"
                                                class="pl-1 pr-1 input__pasport-seria">
                                            </v-text-field>
                                        </div>
                                    </div>
                                    <!-- --------------------------------------------- -->
                                    <!-- МІсце проживання -->
                                    <div class="box__content ml-1">
                                        <p class="text-h7">Місце проживання</p>
                                        <div class="d-flex align-center mt-4">
                                            <p class="mb-0 mr-1">Індекс</p>
                                            <v-text-field
                                                :value="oneCreditClient.residencePlace_zipCode"
                                                @input="inputResidencePlaceZipCode"
                                                outlined
                                                :disabled="activelyСhange"
                                                dense
                                                :flat="true"
                                                hide-details="auto"
                                                class="pl-1 pr-1 input__birthday"
                                            ></v-text-field>
                                        </div>
                                        <div class="d-flex align-center mt-4">
                                            <p class="mb-0 mr-1">Область</p>
                                            <v-text-field
                                                :value="oneCreditClient.residencePlace_region"
                                                @input="inputResidencePlaceRegion"
                                                outlined
                                                :disabled="activelyСhange"
                                                dense
                                                :flat="true"
                                                hide-details="auto"
                                                class="pl-1 pr-1"
                                            ></v-text-field>
                                        </div>
                                        <div class="d-flex align-center mt-4">
                                            <p class="mb-0 mr-1">Район</p>
                                            <v-text-field
                                                :value="oneCreditClient.residencePlace_district"
                                                @input="inputResidencePlaceDistrict"
                                                outlined
                                                :disabled="activelyСhange"
                                                dense
                                                :flat="true"
                                                hide-details="auto"
                                                class="pl-1 pr-1"
                                            ></v-text-field>
                                        </div>
                                        <div class="d-flex align-center mt-4">
                                            <p class="mb-0 mr-1">Місто</p>
                                            <v-text-field
                                                :value="oneCreditClient.residencePlace_city"
                                                @input="inputResidencePlaceCity"
                                                outlined
                                                :disabled="activelyСhange"
                                                dense
                                                :flat="true"
                                                hide-details="auto"
                                                class="pl-1 pr-1"
                                            ></v-text-field>
                                        </div>
                                         <div class="d-flex align-center mt-4">
                                            <p class="mb-0 mr-1">Вулиця</p>
                                            <v-text-field
                                                :value="oneCreditClient.residencePlace_street"
                                                @input="inputResidencePlaceStreet"
                                                outlined
                                                :disabled="activelyСhange"
                                                dense
                                                :flat="true"
                                                hide-details="auto"
                                                class="pl-1 pr-1"
                                            ></v-text-field>
                                        </div>
                                        <div class="d-flex align-center mt-4">
                                            <p class="mb-0 mr-1">буд</p>
                                            <v-text-field
                                                :value="oneCreditClient.residencePlace_house"
                                                @input="inputResidencePlaceHouse"
                                                outlined
                                                :disabled="activelyСhange"
                                                dense
                                                :flat="true"
                                                hide-details="auto"
                                                class="pl-1 pr-1 input__pasport-seria">
                                            </v-text-field>
                                            <p class="mb-0 mr-1">корп</p>
                                            <v-text-field
                                                :value="oneCreditClient.residencePlace_corps"
                                                @input="inputResidencePlaceCorps"
                                                outlined
                                                :disabled="activelyСhange"
                                                dense
                                                :flat="true"
                                                hide-details="auto"
                                                class="pl-1 pr-1 input__pasport-seria">
                                            </v-text-field>
                                            <p class="mb-0 mr-1">кв</p>
                                            <v-text-field
                                                :value="oneCreditClient.residencePlace_room"
                                                @input="inputResidencePlaceRoom"
                                                outlined
                                                :disabled="activelyСhange"
                                                dense
                                                :flat="true"
                                                hide-details="auto"
                                                class="pl-1 pr-1 input__pasport-seria">
                                            </v-text-field>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- --------------------------------------------- -->
                            <!-- РОЗДІЛ 4 -->
                            <!-- Телефони контактних осіб -->
                            <div class="box">
                                <div class="d-flex align-center mt-4">
                                    <p class="mb-0 mr-1 profile__paragraf">{{ oneCreditClient.contactPhone_personOne }}</p>
                                    <v-text-field
                                        :value="oneCreditClient.contactPhone_one"
                                        outlined
                                        :disabled="activelyNotСhange"
                                        dense
                                        :flat="true"
                                        hide-details="auto"
                                        class="pl-1 pr-1 input__tel">
                                    </v-text-field>
                                </div>
                                <div class="d-flex align-center mt-4">
                                    <p class="mb-0 mr-1 profile__paragraf">{{ oneCreditClient.contactPhone_personTwo }}</p>
                                    <v-text-field
                                        :value="oneCreditClient.contactPhone_two"
                                        outlined
                                        :disabled="activelyNotСhange"
                                        dense
                                        :flat="true"
                                        hide-details="auto"
                                        class="pl-1 pr-1 input__tel">
                                    </v-text-field>
                                </div>
                                 <div class="d-flex align-center mt-4">
                                    <p class="mb-0 mr-1 profile__paragraf">{{ oneCreditClient.contactPhone_personThree }}</p>
                                    <v-text-field
                                        :value="oneCreditClient.contactPhone_three"
                                        outlined
                                        :disabled="activelyNotСhange"
                                        dense
                                        :flat="true"
                                        hide-details="auto"
                                        class="pl-1 pr-1 input__tel">
                                    </v-text-field>
                                </div>
                            </div>
                            <!-- --------------------------------------------- -->
                            <!-- РОЗДІЛ 5 -->
                            <!-- Місце роботи та посада-->
                            <div class="box">
                                <div class="d-flex align-center mt-4">
                                    <p class="mb-0 mr-1">організація</p>
                                    <v-text-field
                                        :value="oneCreditClient.jobName"
                                        @input="inputJobName"
                                        outlined
                                        :disabled="activelyСhange"
                                        dense
                                        :flat="true"
                                        hide-details="auto"
                                        class="pl-1 pr-1 input__tel">
                                    </v-text-field>
                                    <p class="mb-0 mr-1">посада</p>
                                    <v-text-field
                                        :value="oneCreditClient.jobPosition"
                                        @input="inputJobPosition"
                                        outlined
                                        :disabled="activelyСhange"
                                        dense
                                        :flat="true"
                                        hide-details="auto"
                                        class="pl-1 pr-1 input__tel">
                                    </v-text-field>
                                </div>
                            </div>
                        </v-form>
                    </v-col>
                </v-row>
            </v-container>
            <div class="profile__footer-button" v-if="!activelyСhange">
                <button class="btn btn-change confirm-change" @click="cancelChanges">ВІДМІНИТИ</button>
                <button class="btn btn-change confirm-change" @click="confirmСhanges(oneCreditClient._id)">ЗМІНИТИ</button>
            </div>
      </v-card>
    </div>
</template>

<script>
import DocToWord from '@/components/DocToWord/DocToWord.vue'
import ContractAplication from '../../CreditContracts/Applications/ContractAplication.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'profile',
  components: {
    DocToWord,
    ContractAplication
  },
  data: () => ({
    activelyСhange: true,
    activelyNotСhange: true,
    modalCardVisible: false,
    client_firstName: '',
    client_secondName: '',
    client_surName: '',
    client_IPN: '',
    client_birthday: '',
    client_phone: '',
    passport_seria: '',
    passport_number: '',
    passport_authority: '',
    passport_issueDate: '',
    registrationPlace_zipCode: '',
    registrationPlace_region: '',
    registrationPlace_district: '',
    registrationPlace_city: '',
    registrationPlace_street: '',
    registrationPlace_house: '',
    registrationPlace_corps: '',
    registrationPlace_room: '',
    residencePlace_zipCode: '',
    residencePlace_region: '',
    residencePlace_district: '',
    residencePlace_city: '',
    residencePlace_street: '',
    residencePlace_house: '',
    residencePlace_corps: '',
    residencePlace_room: '',
    jobName: '',
    jobPosition: ''
  }),
  computed: {
    ...mapState([
      'oneCreditClient'
    ])
  },
  methods: {
    ...mapActions([
      'GET_ONE_CREDIT_CLIENT'
    ]),
    changeClientData () {
      this.activelyСhange = false
      this.client_firstName = this.oneCreditClient.client_firstName
      this.client_surName = this.oneCreditClient.client_surName
      this.client_IPN = this.oneCreditClient.client_IPN
      this.client_secondName = this.oneCreditClient.client_secondName
      this.client_birthday = this.oneCreditClient.client_birthday
      this.client_phone = this.oneCreditClient.client_phone
      this.passport_seria = this.oneCreditClient.PASSPORT.passport_seria
      this.passport_number = this.oneCreditClient.PASSPORT.passport_number
      this.passport_authority = this.oneCreditClient.PASSPORT.passport_authority
      this.passport_issueDate = this.oneCreditClient.PASSPORT.passport_issueDate
      this.registrationPlace_zipCode = this.oneCreditClient.registrationPlace_zipCode
      this.registrationPlace_region = this.oneCreditClient.registrationPlace_region
      this.registrationPlace_district = this.oneCreditClient.registrationPlace_district
      this.registrationPlace_city = this.oneCreditClient.registrationPlace_city
      this.registrationPlace_street = this.oneCreditClient.registrationPlace_street
      this.registrationPlace_house = this.oneCreditClient.registrationPlace_house
      this.registrationPlace_corps = this.oneCreditClient.registrationPlace_corps
      this.registrationPlace_room = this.oneCreditClient.registrationPlace_room
      this.residencePlace_zipCode = this.oneCreditClient.residencePlace_zipCode
      this.residencePlace_region = this.oneCreditClient.residencePlace_region
      this.residencePlace_district = this.oneCreditClient.residencePlace_district
      this.residencePlace_city = this.oneCreditClient.residencePlace_city
      this.residencePlace_street = this.oneCreditClient.residencePlace_street
      this.residencePlace_house = this.oneCreditClient.residencePlace_house
      this.residencePlace_corps = this.oneCreditClient.residencePlace_corps
      this.residencePlace_room = this.oneCreditClient.residencePlace_room
      this.jobName = this.oneCreditClient.jobName
      this.jobPosition = this.oneCreditClient.jobPosition
    },
    inputFirstName (event) {
      this.client_firstName = event
    },
    inputSecondName (event) {
      this.client_secondName = event
    },
    inputSurName (event) {
      this.client_surName = event
    },
    inputIPN (event) {
      this.client_IPN = event
    },
    inputBirthday (event) {
      this.client_birthday = event
    },
    inputPassportSeria (event) {
      this.passport_seria = event
    },
    inputPassportNumber (event) {
      this.passport_number = event
    },
    inputPassportAuthority (event) {
      this.passport_authority = event
    },
    inputPassportIssueDate (event) {
      this.passport_issueDate = event
    },
    inputRegistrationPlaceZipCode (event) {
      this.registrationPlace_zipCode = event
    },
    inputRegistrationPlaceRegion (event) {
      this.registrationPlace_region = event
    },
    inputRegistrationPlaceDistrict (event) {
      this.registrationPlace_district = event
    },
    inputRegistrationPlaceCity (event) {
      this.registrationPlace_city = event
    },
    inputRegistrationPlaceStreet (event) {
      this.registrationPlace_street = event
    },
    inputRegistrationPlaceHouse (event) {
      this.registrationPlace_house = event
    },
    inputRegistrationPlaceCorps (event) {
      this.registrationPlace_corps = event
    },
    inputRegistrationPlaceRoom (event) {
      this.registrationPlace_room = event
    },
    inputResidencePlaceZipCode (event) {
      this.residencePlace_zipCode = event
    },
    inputResidencePlaceRegion (event) {
      this.residencePlace_region = event
    },
    inputResidencePlaceDistrict (event) {
      this.residencePlace_district = event
    },
    inputResidencePlaceCity (event) {
      this.residencePlace_city = event
    },
    inputResidencePlaceStreet (event) {
      this.residencePlace_street = event
    },
    inputResidencePlaceHouse (event) {
      this.residencePlace_house = event
    },
    inputResidencePlaceCorps (event) {
      this.residencePlace_corps = event
    },
    inputResidencePlaceRoom (event) {
      this.residencePlace_room = event
    },
    inputJobName (event) {
      this.jobName = event
    },
    inputJobPosition (event) {
      this.jobPosition = event
    },
    cancelChanges () {
      this.activelyСhange = true
    },
    confirmСhanges (id) {
      console.log(id, 9999)
      const clientProfileData = {
        _id: this.oneCreditClient._id,
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
      this.$store.dispatch('UPDATE_CLIENT', { id, clientProfileData })
      this.$router.push('/clients')
    },
    showModalCard () {
      this.modalCardVisible = true
    },
    closeContractAplication (data) {
      this.modalCardVisible = data
    }
  },
  mounted () {
    this.GET_ONE_CREDIT_CLIENT(this.$route.query.id)
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/styles/variables';
.box {
    border: 1px solid $bordercolor;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: $bradius;
    margin-bottom: $mbprofile;
    &__content {
        width: 50%;
        border-radius: $bradius;
        padding-left: 6px;
        padding-right: 6px;
        padding-bottom: 15px;
        background: #f5f5f5
    }
}
.profile{
    &__title-input {
        vertical-align: baseline;
    }
    &__paragraf {
        width: 150px;
        text-align: left;
    }
    &__header {
        display: flex;
        padding-left: 15px;
        padding-right: 15px;
        min-height: 56px;
        border-bottom: thin solid rgba(0, 0, 0, .12);
    }
    &__header-button {
        align-items: center;
        justify-content: end;
        display: flex;
        padding-left: 15px;
        padding-right: 15px;
        min-height: 56px;
        border-bottom: thin solid rgba(0, 0, 0, .12);
      }
    &__footer-button {
        display: flex;
        justify-content: flex-end;
        padding: 15px;
    }
}
.input {
    &__ipn{
        max-width: 223px;
    }
    &__birthday {
        max-width: 120px;
    }
    &__tel {
        max-width: 224px;
    }
    &__pasport-seria{
        max-width: 60px;
    }
}

.confirm-change {
    margin-left: $mbutton;
}
</style>
