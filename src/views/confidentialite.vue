<template>
    <div class="privacy-policy">
        
      <h1>{{ $t('message.privacy.title') }}</h1>
        <small>{{ DateUtils.formatDate('2024-10-13', locale) }}</small>
      
      <section>
        <h2>{{ $t('message.privacy.cookies.title') }}</h2>
        <p>{{ $t('message.privacy.cookies.intro') }}</p>
        
        <h3>{{ $t('message.privacy.cookies.details.title') }}</h3>
        <ul>
          <li>{{ $t('message.privacy.cookies.details.lang') }}</li>
          <li>{{ $t('message.privacy.cookies.details.rc_a') }}</li>
          <li>{{ $t('message.privacy.cookies.details.rc_c') }}</li>
        </ul>
      </section>
      
      <section>
        <h2>{{ $t('message.privacy.data_protection.title') }}</h2>
        <p>{{ $t('message.privacy.data_protection.content') }}</p>
      </section>
      
      <section>
        <h2>{{ $t('message.privacy.user_rights.title') }}</h2>
        <p>{{ $t('message.privacy.user_rights.content') }}</p>
      </section>
      
      <section>
        <h2>{{ $t('message.privacy.contact.title') }}</h2>
        <p>{{ $t('message.privacy.contact.content') }}</p>
      </section>
      
      <section>
        <h2>{{ $t('message.privacy.policy_update.title') }}</h2>
        <p>{{ $t('message.privacy.policy_update.content') }}</p>
      </section>
    </div>
  </template>
  
  <script setup>
import { formatDate } from '@vueuse/core';
import DateUtils from '../utils/date_utils';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

  </script>
  
  <style scoped>
  .privacy-policy {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h1, h2, h3 {
    color: white;
    margin-top:5vh;
  }
  
  p {
    line-height: 1.6;
  }
  </style>
  