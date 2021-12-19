"""
Django settings for auth_system project.

Generated by 'django-admin startproject' using Django 3.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '0mka^9ga&*+$z17i+&azju+h5f9fe!2*!_2nuu+-fu7&r*u3i3'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'djoser',
    'accounts',
    "corsheaders",
   
      'social_django',
    #   'social.apps.django_app.default',
      'rest_framework_simplejwt',
      'rest_framework_simplejwt.token_blacklist'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'social_django.middleware.SocialAuthExceptionMiddleware',
    #  'social.apps.django_app.middleware.SocialAuthExceptionMiddleware',
    
]

ROOT_URLCONF = 'auth_system.urls'
import os
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR,'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                 'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

WSGI_APPLICATION = 'auth_system.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'auth_system',
        'USER':'postgres',
        'PASSWORD':'postgres',
        'HOST':'localhost',
        'PORT':'5432'
    }
}

EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST='smtp.gmail.com'
EMAIL_PORT=587
EMAIL_HOST_USER='mahin546@gmail.com'
EMAIL_HOST_PASSWORD='vxhpastvnpczduzw'
EMAIL_USE_TLS=True


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES':[
        'rest_framework.permissions.IsAuthenticated'
    ],  
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        
    ),
}
AUTHENTICATION_BACKENDS = (
    # 'social_core.backends.open_id.OpenIdAuth',
    # 'social_core.backends.google.GoogleOpenId',
    'social_core.backends.google.GoogleOAuth2',
    'social_core.backends.facebook.FacebookOAuth2',
    # 'social_core.backends.google.GoogleOAuth',
    # 'social_core.backends.twitter.TwitterOAuth',
    # 'social_core.backends.yahoo.YahooOpenId',
    'django.contrib.auth.backends.ModelBackend',
)

from datetime import timedelta
SIMPLE_JWT = {
   'AUTH_HEADER_TYPES': ('JWT',),
       'ACCESS_TOKEN_LIFETIME': timedelta(minutes=16),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    # 'ROTATE_REFRESH_TOKENS': False,
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
}
# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'
MEDIA_URL = '/media/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'build/','static')]
STATIC_ROOT = os.path.join(BASE_DIR,'build/', 'staticroot/')
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DJOSER={
    'LOGIN_FIELD':'email',
    'USER_CREATE_PASSWORD_RETYPE':True,
    'USERNAME_CHANGED_EMAIL_CONFIRMATION':True,
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION':True,
    'SEND_CONFIRMATION_EMAIL':True,
    'SET_USERNAME_RETYPE':True,
    'SET_PASSWORD_RETYPE':True,
    'PASSWORD_RESET_CONFIRM_RETYPE':True,
    'PASSWORD_RESET_CONFIRM_URL':'password/reset/confirm/{uid}/{token}',
    'USERNAME_RESET_CONFIRM_URL':'email/reset/confirm/{uid}/{token}',
    'ACTIVATION_URL':'activate/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL':True,
    'user_create': ['rest_framework.permissions.AllowAny'],
    'SOCIAL_AUTH_TOKEN_STRATEGY': 'djoser.social.token.jwt.TokenStrategy',
    'SOCIAL_AUTH_ALLOWED_REDIRECT_URIS':['http://localhost:8000/google','http://localhost:8000/facebook',],
    
    'SERIALIZERS':{
        'user_create':'accounts.serializers.UserCreateSerialize',
        'user':'accounts.serializers.UserCreateSerialize',
        'current_user':'accounts.serializers.UserCreateSerialize',
        'user_delete': 'djoser.serializers.UserDeleteSerializer',

    }
}
SOCIAL_AUTH_RAISE_EXCEPTIONS = False
SOCIAL_AUTH_LOGIN_ERROR_URL = '/'




SOCIAL_AUTH_GOOGLE_OAUTH2_KEY="614837423183-qsk8porrhaip8hps3g4uatjlf1fqjhqk.apps.googleusercontent.com"
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET="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"
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'openid']
SOCIAL_AUTH_GOOGLE_OAUTH2_EXTRA_DATA=['first_name','last_name']


SOCIAL_AUTH_FACEBOOK_KEY='426338662485332'
SOCIAL_AUTH_FACEBOOK_SECREAT='edcd7a7078caad7fde1113b78fba06ee'
SOCIAL_AUTH_FACEBOOK_SCOPE=['email']
SOCIAL_AUTH_FACEBOOK_PROFILE_EXTRA_PERAMS={'fields':'email,first_name,last_name',}


CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
    'http://localhost:8000',
)
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
     'http://localhost:8000',
]
CORS_URLS_REGEX = r'^/api.*'

AUTH_USER_MODEL='accounts.UserAccount'
