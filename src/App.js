import './App.css';
import  ReactMapGL, {Marker} from 'react-map-gl'
import Covid from './icons/covid.png'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { useEffect, useState } from 'react';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
const MAPBOX_TOKEN = 'pk.eyJ1Ijoidml0b3JmYWlsIiwiYSI6ImNsOHhyajNjYjA4aXIzdW56ZDN1NjI0ZjUifQ.dYaH3rrTcs8WwFHCHCSCRQ';
const cidades = ["Moraújo"	,
          "Frecheirinha"	,
          "Itaiçaba"	,
          "Orós"	,
          "Acarape"	,
          "Reriutaba"	,
          "Redenção"	,
          "Eusébio"	,
          "Quixeré"	,
          "Iracema"	,
          "Guaramiranga"	,
          "Crateús"	,
          "Brejo Santo"	,
          "Tabuleiro do Norte"	,
          "Quixelô"	,
          "Groaíras"	,
          "Aracoiaba"	,
          "Palhano"	,
          "Alcântaras"	,
          "Senador Sá"	,
          "Cedro"	,
          "Cruz"	,
          "Morada Nova"	,
          "Tauá"	,
          "Ibicuitinga"	,
          "São Gonçalo do Amarante"	,
          "Jijoca de Jericoacoara"	,
          "Paracuru"	,
          "Pereiro"	,
          "Icapuí"	,
          "Varjota"	,
          "Aratuba"	,
          "Catunda"	,
          "Capistrano"	,
          "Russas"	,
          "Farias Brito"	,
          "Cariré"	,
          "Hidrolândia"	,
          "Fortim"	,
          "Martinópole"	,
          "Crato"	,
          "Mucambo"	,
          "Sobral"	,
          "Jaguaribe"	,
          "Ararendá"	,
          "Potiretama"	,
          "Banabuiú"	,
          "Tianguá"	,
          "Limoeiro do Norte"	,
          "Carnaubal"	,
          "Chaval"	,
          "Cariús"	,
          "Piquet Carneiro"	,
          "Santa Quitéria"	,
          "Uruoca"	,
          "Ipaporanga"	,
          "Itaitinga"	,
          "Nova Russas"	,
          "Quixeramobim"	,
          "Ereré"	,
          "Ipu"	,
          "Milhã"	,
          "Pacoti"	,
          "Baturité"	,
          "Milagres"	,
          "Iguatu"	,
          "Mulungu"	,
          "Monsenhor Tabosa"	,
          "Barbalha"	,
          "Meruoca"	,
          "Horizonte"	,
          "Baixio"	,
          "Quixadá"	,
          "Alto Santo"	,
          "Tamboril"	,
          "Pindoretama"	,
          "Juazeiro do Norte"	,
          "Coreaú"	,
          "Jaguaruana"	,
          "Antonina do Norte"	,
          "Jaguaretama"	,
          "Icó"	,
          "Itapiúna"	,
          "Aracati"	,
          "Bela Cruz"	,
          "São João do Jaguaribe"	,
          "Beberibe"	,
          "Pentecoste"	,
          "Porteiras"	,
          "São Luís do Curu"	,
          "Ipaumirim"	,
          "Granjeiro"	,
          "Várzea Alegre"	,
          "Itatira"	,
          "Miraíma"	,
          "Assaré"	,
          "Pires Ferreira"	,
          "Pacujá"	,
          "Jati"	,
          "Camocim"	,
          "Chorozinho"	,
          "Graça"	,
          "Jaguaribara"	,
          "Deputado Irapuan Pinheiro"	,
          "Lavras da Mangabeira"	,
          "Mauriti"	,
          "Fortaleza"	,
          "Mombaça"	,
          "Solonópole"	,
          "Maracanaú"	,
          "Apuiarés"	,
          "Tejuçuoca"	,
          "Campos Sales"	,
          "Ibaretama"	,
          "Tururu"	,
          "Ipueiras"	,
          "Maranguape"	,
          "Altaneira"	,
          "Paraipaba"	,
          "Penaforte"	,
          "São Benedito"	,
          "Cascavel"	,
          "Senador Pompeu"	,
          "Barroquinha"	,
          "Nova Olinda"	,
          "Arneiroz"	,
          "Ocara"	,
          "Aquiraz"	,
          "Viçosa do Ceará"	,
          "Uruburetama"	,
          "Independência"	,
          "Paramoti"	,
          "Choró"	,
          "Itarema"	,
          "Itapipoca"	,
          "Acaraú"	,
          "Barro"	,
          "Quiterianópolis"	,
          "Boa Viagem"	,
          "Croatá"	,
          "Tarrafas"	,
          "Santana do Cariri"	,
          "Pacajus"	,
          "Saboeiro"	,
          "Jucás"	,
          "Santana do Acaraú"	,
          "Poranga"	,
          "Acopiara"	,
          "Caridade"	,
          "Pacatuba"	,
          "Aurora"	,
          "Palmácia"	,
          "Forquilha"	,
          "Canindé"	,
          "Madalena"	,
          "Barreira"	,
          "Ibiapina"	,
          "Jardim"	,
          "General Sampaio"	,
          "Salitre"	,
          "Umari"	,
          "Marco"	,
          "Amontada"	,
          "Massapê"	,
          "Missão Velha"	,
          "Morrinhos"	,
          "Guaraciaba do Norte"	,
          "Araripe"	,
          "Guaiúba"	,
          "Caucaia"	,
          "Itapajé"	,
          "Potengi"	,
          "Novo Oriente"	,
          "Granja"	,
          "Caririaçu"	,
          "Ubajara"	,
          "Abaiara"	,
          "Parambu"	,
          "Umirim"	,
          "Irauçuba"	,
          "Aiuaba"	,
          "Trairi"	,
          "Catarina"	,
          "Pedra Branca"]
const mortes = [23	,
  26	,
  22	,
  88	,
  32	,
  32	,
  103	,
  129	,
  45	,
  35	,
  5	,
  232	,
  155	,
  71	,
  29	,
  31	,
  35	,
  25	,
  22	,
  13	,
  41	,
  58	,
  168	,
  187	,
  22	,
  212	,
  31	,
  112	,
  25	,
  33	,
  30	,
  12	,
  17	,
  36	,
  197	,
  58	,
  48	,
  26	,
  28	,
  27	,
  227	,
  30	,
  737	,
  79	,
  22	,
  7	,
  22	,
  186	,
  147	,
  28	,
  27	,
  32	,
  25	,
  70	,
  31	,
  17	,
  70	,
  68	,
  228	,
  15	,
  79	,
  31	,
  26	,
  87	,
  64	,
  233	,
  20	,
  41	,
  163	,
  33	,
  134	,
  13	,
  197	,
  35	,
  77	,
  39	,
  642	,
  70	,
  71	,
  26	,
  43	,
  124	,
  38	,
  165	,
  73	,
  9	,
  129	,
  86	,
  31	,
  39	,
  20	,
  4	,
  78	,
  41	,
  19	,
  44	,
  7	,
  11	,
  14	,
  163	,
  39	,
  19	,
  24	,
  12	,
  54	,
  114	,
  9.654	,
  111	,
  35	,
  743	,
  25	,
  31	,
  40	,
  25	,
  38	,
  59	,
  267	,
  15	,
  76	,
  14	,
  68	,
  157	,
  62	,
  25	,
  20	,
  17	,
  43	,
  94	,
  159	,
  59	,
  56	,
  19	,
  18	,
  47	,
  283	,
  112	,
  45	,
  51	,
  117	,
  17	,
  15	,
  29	,
  122	,
  17	,
  68	,
  87	,
  13	,
  151	,
  52	,
  239	,
  38	,
  23	,
  78	,
  210	,
  37	,
  50	,
  33	,
  58	,
  19	,
  21	,
  10	,
  36	,
  57	,
  86	,
  56	,
  33	,
  63	,
  23	,
  61	,
  965	,
  138	,
  6	,
  40	,
  88	,
  46	,
  42	,
  16	,
  67	,
  40	,
  44	,
  11	,
  96	,
  18	,
  65,
  58,
  74,
  5,
  38,
  119,
  185,
  3,
  21,
  34,
  7,
  50,
  15,
  2,
  50,
  306,
  26,
  8,
  717,
  28,
  136,
  161,
  5505,
  165,
  505,
  27,
  52,
  25,
  20,
  162,
  14,
  22,
  25,
  58,
  34,
  27,
  8,
  21,
  15,
  42,
  33,
  58,
  119,
  93,
  55,
  29,
  35,
  116,
  67,
  28,
  7,
  44,
  9,
  28,
  22,
  11,
  128,
  27,
  59,
  123,
  147,
  998,
  18,
  73,
  12,
  23,
  12,
  33,
  35,
  29,
  11,
  30,
  18,
  130,
  31,
  22,
  7,
  118,
  76,
  41,
  10,
  25,
  42,
  9,
  16,
  29,
  326,
  150,
  32,
  55,
  38,
  46,
  1724,
  109,
  38,
  18,
  19,
  83,
  445,
  13,
  34,
  15,
  7,
  53,
  15,
  525,
  72,
  47,
  11,
  97,
  20,
  43,
  71,
  48,
  61,
  51,
  25,
  18,
  37,
  28,
  31,
  19,
  17,
  11,
  13,
  25,
  265,
  64,
  49,
  25,
  29,
  35,
  16,
  13,
  27,
  171,
  10,
  238,
  10,
  22,
  46,
  247,
  49,
  81,
  840,
  13,
  9,
  20,
  33,
  37,
  115,
  67,
  34,
  15,
  16,
  28,
  15,
  46,
  13,
  19,
  25,
  48,
  51,
  25,
  65,
  32,
  7,
  34,
  17,
  30,
  6,
  20,
  6,
  24,
  50,
  12,
  12,
  13,
  17,
  67,
  39,
  6,
  66,
  102,
  80
  ]
const cordenadas = [{ lat: -3.46612, lng: -40.67894 },
  { lat: -3.75954, lng: -40.81494 },
  { lat: -4.67846, lng: -37.82315 },
  { lat: -6.24471, lng: -38.91441 },
  { lat: -4.22452, lng: -38.70423 },
  { lat: -4.14324, lng: -40.58087 },
  { lat: -4.2247, lng: -38.7282 },
  { lat: -3.89087, lng: -38.44987},
  { lat: -5.07457, lng: -37.9909 },
  { lat: -5.81795, lng: -38.30556 },
  { lat: -4.26064, lng: -38.93458 },
  { lat: -5.17584, lng: -40.66796 },
  { lat: -7.49079, lng: -38.98517 },
  { lat: -5.2447, lng: -38.13192 },
  { lat: -6.2525, lng: -39.19967 },
  { lat: -3.91751, lng: -40.38591 },
  { lat: -4.36872, lng: -38.8134 },
  { lat: -4.74513, lng: -37.95987 },
  { lat: -3.5873, lng: -40.54332 },
  { lat: -3.35287, lng: -40.46642 },
  { lat: -6.60093, lng: -39.06148 },
  { lat: -2.91945, lng: -40.17757 },
  { lat: -5.10595, lng: -38.36581 },
  { lat: -6.00226, lng: -40.29879 },
  { lat: -4.96469, lng: -38.63615 },
  { lat: -3.60753, lng: -38.96769 },
  { lat: -2.90163, lng: -40.4473 },
  { lat: -3.43114, lng: -39.03532 },
  { lat: -6.03718, lng: -38.45869 },
  { lat: -4.69377, lng: -37.38375 },
  { lat: -4.19307, lng: -40.47331 },
  { lat: -4.41923, lng: -39.04627 },
  { lat: -4.64931, lng: -40.2 },
  { lat: -4.45458, lng: -38.89843 },
  { lat: -4.94191, lng: -37.97765 },
  { lat: -6.92792, lng: -39.57115 },
  { lat: -3.94905, lng: -40.47357 },
  { lat: -4.4072, lng: -40.40374 },
  { lat: -4.45087, lng: -37.79644 },
  { lat: -3.22417, lng: -40.69613 },
  { lat: -7.23089, lng: -39.40561 },
  { lat: -3.90351, lng: -40.74589 },
  { lat: -3.68015, lng: -40.34907 },
  { lat: -5.89228, lng: -38.62329 },
  { lat: -4.75417, lng: -40.82933 },
  { lat: -5.72147, lng: -38.15402 },
  { lat: -5.30599, lng: -38.91957 },
  { lat: -3.72861, lng: -40.99204 },
  { lat: -5.14393, lng: -38.09311 },
  { lat: -4.16324, lng: -40.94225 },
  { lat: -3.03507, lng: -41.24324 },
  { lat: -6.53424, lng: -39.49793 },
  { lat: -5.79863, lng: -39.41999 },
  { lat: -4.33216, lng: -40.15706 },
  { lat: -3.31532, lng: -40.55727 },
  { lat: -4.90498, lng: -40.76411 },
  { lat: -3.97208, lng: -38.52888 },
  { lat: -4.70603, lng: -40.56021 },
  { lat: -5.19785, lng: -39.29718 },
  { lat: -6.02831, lng: -38.34818 },
  { lat: -4.31758, lng: -40.70645 },
  { lat: -5.67709, lng: -39.1941 },
  { lat: -4.22519, lng: -38.91882 },
  { lat: -4.32598, lng: -38.88324 },
  { lat: -7.30817, lng: -38.94348 },
  { lat: -6.35856, lng: -39.29778 },
  { lat: -4.29899, lng: -38.99156 },
  { lat: -4.79183, lng: -40.06494 },
  { lat: -7.30939, lng: -39.30382 },
  { lat: -3.54198, lng: -40.45434 },
  { lat: -4.10185, lng: -38.48331 },
  { lat: -6.72863, lng: -38.71696 },
  { lat: -4.97159, lng: -39.01614 },
  { lat: -5.52188, lng: -38.27188 },
  { lat: -4.82926, lng: -40.32018 },
  { lat: -4.03195, lng: -38.30583 },
  { lat: -7.2366, lng: -39.32194 },
  { lat: -3.55143, lng: -40.65276 },
  { lat: -4.8371, lng: -37.78239 },
  { lat: -6.77038, lng: -39.99 },
  { lat: -5.60693, lng: -38.7668 },
  { lat: -6.4037, lng: -38.85253 },
  { lat: -4.55926, lng: -38.92101 },
  { lat: -4.5634, lng: -37.76942 },
  { lat: -3.05342, lng: -40.16838 },
  { lat: -5.27054, lng: -38.27217 },
  { lat: -4.18933, lng: -38.11809 },
  { lat: -3.79144, lng: -39.27103 },
  { lat: -7.53409, lng: -39.11532 },
  { lat: -3.67213, lng: -39.24008 },
  { lat: -6.78898, lng: -38.71874 },
  { lat: -6.88997, lng: -39.2169 },
  { lat: -6.79465, lng: -39.30001 },
  { lat: -4.52979, lng: -39.62264 },
  { lat: -3.56819, lng: -39.96979 },
  { lat: -6.86777, lng: -39.86949 },
  { lat: -4.24408, lng: -40.64332 },
  { lat: -3.98169, lng: -40.69705 },
  { lat: -7.68762, lng: -39.00548 },
  { lat: -2.91217, lng: -40.84868 },
  { lat: -4.29974, lng: -38.50142 },
  { lat: -4.04418, lng: -40.75018 },
  { lat: -5.45827, lng: -38.46487 },
  { lat: -5.9167, lng: -39.26656 },
  { lat: -6.75175, lng: -38.96361 },
  { lat: -7.3874, lng: -38.7701 },
  { lat: -3.71841, lng: -38.54288 },
  { lat: -5.7443, lng: -39.62901 },
  { lat: -5.7215, lng: -39.00778 },
  { lat: -3.87569, lng: -38.62685 },
  { lat: -3.94459, lng: -39.43486 },
  { lat: -3.98557, lng: -39.57842 },
  { lat: -7.06968, lng: -40.36983 },
  { lat: -4.8192, lng: -38.82164 },
  { lat: -3.59957, lng: -39.43542 },
  { lat: -4.54241, lng: -40.71697 },
  { lat: -3.88974, lng: -38.68175 },
  { lat: -6.99817, lng: -39.73732 },
  { lat: -3.43311, lng: -39.14709 },
  { lat: -7.82666, lng: -39.08555 },
  { lat: -4.0451, lng: -40.86756 },
  { lat: -4.13033, lng: -38.23743 },
  { lat: -5.58267, lng: -39.37193 },
  { lat: -3.02126, lng: -41.13581 },
  { lat: -7.0929, lng: -39.67991 },
  { lat: -6.32545, lng: -40.15885 },
  { lat: -4.49044, lng: -38.5964 },
  { lat: -3.89894, lng: -38.36749 },
  { lat: -3.56591, lng: -41.09194 },
  { lat: -3.62314, lng: -39.51084 },
  { lat: -5.39647, lng: -40.31202 },
  { lat: -4.09894, lng: -39.23886 },
  { lat: -4.84462, lng: -39.13866 },
  { lat: -2.92211, lng: -39.91384 },
  { lat: -3.50111, lng: -39.57956 },
  { lat: -2.88355, lng: -40.12011 },
  { lat: -7.17482, lng: -38.77971 },
  { lat: -5.84797, lng: -40.70411 },
  { lat: -5.12636, lng: -39.73143 },
  { lat: -4.41585, lng: -40.90792 },
  { lat: -6.6833, lng: -39.75751 },
  { lat: -7.18594, lng: -39.73714 },
  { lat: -4.17414, lng: -38.46578 },
  { lat: -6.53677, lng: -39.90204 },
  { lat: -6.52069, lng: -39.52796 },
  { lat: -3.46096, lng: -40.20759 },
  { lat: -4.74475, lng: -40.92593 },
  { lat: -6.08993, lng: -39.44886 },
  { lat: -4.23218, lng: -39.1944 },
  { lat: -3.98503, lng: -38.61638 },
  { lat: -6.94305, lng: -38.96842 },
  { lat: -4.14651, lng: -38.84594 },
  { lat: -3.80075, lng: -40.26164 },
  { lat: -4.35911, lng: -39.31558 },
  { lat: -4.85307, lng: -39.57636 },
  { lat: -4.28729, lng: -38.64057 },
  { lat: -3.92446, lng: -40.89141 },
  { lat: -7.58706, lng: -39.27596 },
  { lat: -4.0479, lng: -39.44841 },
  { lat: -7.28355, lng: -40.45413 },
  { lat: -6.64505, lng: -38.70108 },
  { lat: -3.12526, lng: -40.15128 },
  { lat: -3.35864, lng: -39.83101 },
  { lat: -3.52178, lng: -40.34733 },
  { lat: -7.24962, lng: -39.14616 },
  { lat: -3.22929, lng: -40.12294 },
  { lat: -4.16169, lng: -40.74643 },
  { lat: -7.2121, lng: -40.13508 },
  { lat: -4.04034, lng: -38.63587 },
  { lat: -3.73542, lng: -38.66088 },
  { lat: -3.68303, lng: -39.58596 },
  { lat: -7.09207, lng: -40.02438 },
  { lat: -5.53618, lng: -40.77568 },
  { lat: -3.12941, lng: -40.83459 },
  { lat: -7.04128, lng: -39.2821 },
  { lat: -3.85229, lng: -40.91964 },
  { lat: -7.36031, lng: -39.04774 },
  { lat: -6.20973, lng: -40.69575 },
  { lat: -3.67695, lng: -39.34939 },
  { lat: -3.74708, lng: -39.78166 },
  { lat: -6.57388, lng: -40.11925 },
  { lat: -3.2761, lng: -39.26798 },
  { lat: -6.12523, lng: -39.87635 },
  { lat: -5.467, lng: -39.71461 },
  { lat: -7.72113, lng: -39.23685 },
  { lat: -7.51407, lng: -39.72175 },
  { lat: -7.74939, lng: -37.63361 },
  { lat: -7.93827, lng: -38.15232 },
  { lat: -7.79757, lng: -37.79815 },
  { lat: -8.07212, lng: -39.12955 },
  { lat: -7.98405, lng: -38.29392 },
  { lat: -7.60101, lng: -37.65036 },
  { lat: -7.34684, lng: -37.28654 },
  { lat: -7.37867, lng: -37.18758 },
  { lat: -7.67714, lng: -37.45925 },
  { lat: -7.58258, lng: -37.53835 },
  { lat: -8.22888, lng: -39.37739 },
  { lat: -3.84493, lng: -32.40859 },
  { lat: -8.59908, lng: -35.9521 },
  { lat: -8.89072, lng: -36.49655 },
  { lat: -7.40795, lng: -35.27532 },
  { lat: -7.77391, lng: -35.84964 },
  { lat: -8.2777, lng: -35.98154 },
  { lat: -8.46728, lng: -36.77872 },
  { lat: -8.41867, lng: -37.06407 },
  { lat: -7.56241, lng: -34.99843 },
  { lat: -8.05603, lng: -34.87036 },
  { lat: -7.58015, lng: -40.49987 },
  { lat: -9.39473, lng: -40.50887 },
  { lat: -7.37502, lng: -37.47994 },
  { lat: -8.07153, lng: -37.26644 },
  { lat: -7.94232, lng: -35.9225 },
  { lat: -7.44664, lng: -35.23893 },
  { lat: -7.95443, lng: -36.19853 },
  { lat: -7.71875, lng: -37.84764 },
  { lat: -8.71143, lng: -36.41599 },
  { lat: -7.94392, lng: -39.29604 },
  { lat: -7.46974, lng: -37.27428 },
  { lat: -8.57675, lng: -36.87514 },
  { lat: -7.60201, lng: -37.31001 },
  { lat: -9.0562, lng: -36.62435 },
  { lat: -7.9876, lng: -36.49531 },
  { lat: -7.90173, lng: -35.97989 },
  { lat: -8.89788, lng: -35.14476 },
  { lat: -7.58861, lng: -35.49028 },
  { lat: -7.8616, lng: -38.75933 },
  { lat: -8.36168, lng: -36.68516 },
  { lat: -7.83931, lng: -35.75818 },
  { lat: -7.94944, lng: -35.38432 },
  { lat: -8.50975, lng: -39.30995 },
  { lat: -8.99251, lng: -40.27499 },
  { lat: -7.51378, lng: -35.31686 },
  { lat: -8.45502, lng: -35.94714 },
  { lat: -7.83281, lng: -37.37351 },
  { lat: -8.72529, lng: -38.68936 },
  { lat: -8.14093, lng: -35.39468 },
  { lat: -8.44141, lng: -40.76634 },
  { lat: -7.8426, lng: -35.31342 },
  { lat: -7.8372, lng: -38.10398 },
  { lat: -7.62865, lng: -39.55003 },
  { lat: -8.23772, lng: -35.73846 },
  { lat: -8.738, lng: -36.62574 },
  { lat: -7.76197, lng: -40.26641 },
  { lat: -8.68332, lng: -35.58754 },
  { lat: -8.20079, lng: -35.56671 },
  { lat: -8.01739, lng: -34.84814 },
  { lat: -9.18278, lng: -38.26639 },
  { lat: -8.66142, lng: -36.32271 },
  { lat: -8.23966, lng: -40.32973 },
  { lat: -8.77441, lng: -36.62318 },
  { lat: -8.7072, lng: -36.48747 },
  { lat: -8.14116, lng: -35.86451 },
  { lat: -8.09001, lng: -39.57794 },
  { lat: -8.59754, lng: -38.57482 },
  { lat: -8.32697, lng: -35.70973 },
  { lat: -8.49057, lng: -36.06071 },
  { lat: -8.1208, lng: -38.72877 },
  { lat: -8.33736, lng: -36.4244 },
  { lat: -7.93085, lng: -35.28917 },
  { lat: -8.00819, lng: -35.70071 },
  { lat: -7.71507, lng: -39.61648 },
  { lat: -7.86527, lng: -35.44047 },
  { lat: -8.32638, lng: -36.14132 },
  { lat: -7.77933, lng: -39.93253 },
  { lat: -7.92453, lng: -38.97093 },
  { lat: -8.36474, lng: -36.56102 },
  { lat: -7.58892, lng: -35.09586 },
  { lat: -9.02953, lng: -36.56758 },
  { lat: -8.18588, lng: -36.70306 },
  { lat: -7.74374, lng: -35.60236 },
  { lat: -8.11364, lng: -35.28859 },
  { lat: -7.84537, lng: -35.2554 },
  { lat: -8.50049, lng: -36.9469 },
  { lat: -7.97768, lng: -35.57942 },
  { lat: -7.55941, lng: -35.45403 },
  { lat: -8.9786, lng: -38.21804 },
  { lat: -8.17955, lng: -34.94703 },
  { lat: -7.89318, lng: -35.18159 },
  { lat: -7.86783, lng: -37.97376 },
  { lat: -7.83329, lng: -35.88133 },
  { lat: -7.82038, lng: -38.15158 },
  { lat: -8.522, lng: -36.44437 },
  { lat: -7.99966, lng: -34.99311 },
  { lat: -8.75051, lng: -38.95859 },
  { lat: -7.7488, lng: -34.82473 },
  { lat: -8.51642, lng: -41.00794 },
  { lat: -8.74138, lng: -36.33427 },
  { lat: -8.14931, lng: -36.37029 },
  { lat: -8.61158, lng: -39.60251 },
  { lat: -8.28675, lng: -35.0387 },
  { lat: -9.17079, lng: -36.6877 },
  { lat: -9.11192, lng: -37.12124 },
  { lat: -8.65389, lng: -35.90538 },
  { lat: -7.8867, lng: -40.08278 },
  { lat: -8.91892, lng: -36.65637 },
  { lat: -8.66259, lng: -35.15342 },
  { lat: -7.7997, lng: -35.58786 },
  { lat: -8.62317, lng: -37.15529 },
  { lat: -8.705, lng: -35.52162 },
  { lat: -7.40617, lng: -35.11939 },
  { lat: -8.97426, lng: -36.6885 },
  { lat: -7.68958, lng: -35.51131 },
  { lat: -8.43289, lng: -35.80499 },
  { lat: -8.80338, lng: -35.62495 },
  { lat: -8.66375, lng: -36.00996 },
  { lat: -9.04605, lng: -36.84995 },
  { lat: -8.26915, lng: -38.03723 },
  { lat: -8.31883, lng: -36.28871 },
  { lat: -9.12483, lng: -36.45965 },
  { lat: -8.87568, lng: -36.3666 },
  { lat: -7.9985, lng: -35.01997 },
  { lat: -7.65161, lng: -40.1512 },
  { lat: -8.00156, lng: -35.29309 },
  { lat: -8.71961, lng: -36.13455 },
  { lat: -8.62464, lng: -35.52572 },
  { lat: -7.66617, lng: -35.1005 },
  { lat: -8.16068, lng: -40.61132 },
  { lat: -8.94661, lng: -37.42087 },
  { lat: -8.5381, lng: -37.69733 },
  { lat: -8.39394, lng: -35.06059 },
  { lat: -8.58074, lng: -36.17894 },
  { lat: -7.83916, lng: -34.90811 },
  { lat: -8.75294, lng: -37.34109 },
  { lat: -7.99956, lng: -35.21207 },
  { lat: -8.00373, lng: -36.05741 },
  { lat: -7.90525, lng: -34.9045 },
  { lat: -7.77508, lng: -34.89342 },
  { lat: -7.74748, lng: -35.22195 },
  { lat: -7.94369, lng: -34.86594 },
  { lat: -7.74472, lng: -35.72352 },
  { lat: -9.00484, lng: -36.32679 },
  { lat: -8.35942, lng: -35.76639 },
  { lat: -7.7893, lng: -35.09002 },
  { lat: -8.74989, lng: -35.09696 },
  { lat: -8.12231, lng: -35.09677 },
  { lat: -8.6741, lng: -35.71347 },
  { lat: -8.48725, lng: -36.23581 },
  { lat: -8.82655, lng: -36.01222 },
  { lat: -8.42147, lng: -35.65989 },
  { lat: -9.1023, lng: -38.14715 },
  { lat: -8.7259, lng: -35.79487 },
  { lat: -8.4779, lng: -35.72898 },
  { lat: -8.78241, lng: -35.80955 },
  { lat: -8.7968, lng: -39.82478 },
  { lat: -7.73037, lng: -35.3219 },
  { lat: -8.37791, lng: -35.45113 },
  { lat: -7.85459, lng: -35.60365 },
  { lat: -7.9065, lng: -36.04067 },
  { lat: -8.08747, lng: -37.64009 },
  { lat: -8.88133, lng: -36.19173 },
  { lat: -8.62344, lng: -35.84267 },
  { lat: -7.65818, lng: -35.31895 },
  { lat: -8.80875, lng: -35.9336 },
  { lat: -8.24148, lng: -35.45928 },
  { lat: -7.94067, lng: -35.63577 },
  { lat: -8.34466, lng: -35.35374 },
  { lat: -8.96302, lng: -37.62599 },
  { lat: -7.80695, lng: -35.24352 },
  { lat: -8.59299, lng: -35.11497 },
  { lat: -9.12863, lng: -36.32852 },
  { lat: -8.88986, lng: -36.2846 },
  { lat: -8.90536, lng: -37.83135 },
  { lat: -8.46847, lng: -35.53844 },
  { lat: -8.81589, lng: -35.18348 },
  { lat: -8.58356, lng: -35.38527 },
  { lat: -8.3198, lng: -38.74294 },
  { lat: -7.60522, lng: -35.22236 },
  { lat: -8.35857, lng: -35.22656 },
  { lat: -8.50197, lng: -35.37451 }]
const colors = ['rgba(0, 255, 170, 0.568)','rgba(0, 195, 255, 0.562)', 'rgba(0, 255, 136, 0.493)', 'rgba(51, 142, 185, 0.61)']

function App() {
  const [click , setclick] =useState(false)
  const [cord, setcord] = useState({x:0, y:0 })
  const [intervalo, setintervalo] = useState(0)
  const [min, setmin] = useState(0)
  const [max, setmax] = useState(0)
  const [class1, setclass1] = useState(true)
  const [class2, setclass2] = useState(true)
  const [class3, setclass3] = useState(true)
  const [class4, setclass4] = useState(true)
  const [class5, setclass5] = useState(true)
  const [class6, setclass6] = useState(true)
  const [class7, setclass7] = useState(true)
  const [class8, setclass8] = useState(true)
  const [class9, setclass9] = useState(true)
  useEffect(() => {
    setmin(Math.min(...mortes))
    setmax(Math.max(...mortes))
    const variacao =(max - min)/8
    setintervalo(variacao)
  }, [min, max])
  function checarclasse(i){
    if(i <= min+intervalo){
      return class1
    }
    if(i >= min+intervalo && i < min+(intervalo*2)){
      return class2
    }
    if(i >= min+(intervalo*2) & i < min+(intervalo*3)){
      return class3
    }
    if(i >= min+(intervalo*3) & i < min+(intervalo*4)){
      return class4
    }
    if(i >= min+(intervalo*4) & i < min+(intervalo*5)){
      return class5
    }
    if(i >= min+(intervalo*5) & i < min+(intervalo*6)){
      return class6
    }
    if(i >= min+(intervalo*6) & i < min+(intervalo*7)){
      return class7
    }
    if(i >= min+(intervalo*7) & i < min+(intervalo*8)){
      return class8
    }
    if(i >= min+(intervalo*8) & i <= max){
      return class9
    }
  }
  function show_class(i){
    console.log(i)
    if(i === 'class1'){
      setclass1(true)
      setclass2(false)
      setclass3(false)
      setclass4(false)
      setclass5(false)
      setclass6(false)
      setclass7(false)
      setclass8(false)
      setclass9(false)
    }
    if(i === 'class2'){
      setclass1(false)
      setclass2(true)
      setclass3(false)
      setclass4(false)
      setclass5(false)
      setclass6(false)
      setclass7(false)
      setclass8(false)
      setclass9(false)  
    }
    if(i === 'class3'){
      setclass1(false)
      setclass2(false)
      setclass3(true)
      setclass4(false)
      setclass5(false)
      setclass6(false)
      setclass7(false)
      setclass8(false)
      setclass9(false)
  
    }
    if(i === 'class4'){
      setclass1(false)
      setclass2(false)
      setclass3(false)
      setclass4(true)
      setclass5(false)
      setclass6(false)
      setclass7(false)
      setclass8(false)
      setclass9(false)  
    }
    if(i === 'class5'){
      setclass1(false)
      setclass2(false)
      setclass3(false)
      setclass4(false)
      setclass5(true)
      setclass6(false)
      setclass7(false)
      setclass8(false)
      setclass9(false)
    }
    if(i === 'class6'){
      setclass1(false)
      setclass2(false)
      setclass3(false)
      setclass4(false)
      setclass5(false)
      setclass6(true)
      setclass7(false)
      setclass8(false)
      setclass9(false)  
    }
    if(i === 'class7'){
      setclass1(false)
      setclass2(false)
      setclass3(false)
      setclass4(false)
      setclass5(false)
      setclass6(false)
      setclass7(true)
      setclass8(false)
      setclass9(false)  
    }
    if(i === 'class8'){
      setclass1(false)
      setclass2(false)
      setclass3(false)
      setclass4(false)
      setclass5(false)
      setclass6(false)
      setclass7(false)
      setclass8(true)
      setclass9(false)  
    }
    if(i === 'class9'){
      setclass1(false)
      setclass2(false)
      setclass3(false)
      setclass4(false)
      setclass5(false)
      setclass6(false)
      setclass7(false)
      setclass8(false)
      setclass9(true)
    }
    if(i === 'todos'){
      setclass1(true)
      setclass2(true)
      setclass3(true)
      setclass4(true)
      setclass5(true)
      setclass6(true)
      setclass7(true)
      setclass8(true)
      setclass9(true)

    }
  }
  function mouseClick(){
    if(click == true){
      setclick(false)
    }
    else{
      setclick(true)
    }
  }
  function moverMouse(e){
    if(click === true){
      setcord({
        x: e.clientX,
        y: e.clienty
      })
      console.log(e.clientX)
      console.log(e.clientY)
  
    }
  }
  return (
    <div className="App">
      <div className='descri'>
        <div className='titulo'>
          <h2>COVID</h2>
          <img alt='covid' src={Covid}></img>
        </div>
        <div className='info'>
          Esse mapa em questão disrespeito a quantidades a quantidade 
          de óbitos, por cidade, decorrentes de COVID no estado do Ceará em 2021. Os dados foram obtidos através do site não governamental https://brasil.io/covid19/CE/  
        </div>
        <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
          <h2>Quantidade de mortos</h2>
          <select onChange={(e) => show_class(e.target.value)} style={{width:'30%'}}>
            <option value='todos'>Todos</option>
              <option value='class1'>{min} - {Math.floor(min+intervalo)} mortes</option>
             <option value='class2'>{Math.floor(min+intervalo)} - {Math.floor(min+(intervalo*2))} mortes</option>
             <option value='class3'>{Math.floor(min+(intervalo*2))} - {Math.floor(min+(intervalo*3))} mortes</option>
             <option value='class4'>{Math.floor(min+(intervalo*3))} - {Math.floor(min+(intervalo*4))} mortes</option>
             <option value='class5'>{Math.floor(min+(intervalo*4))} - {Math.floor(min+(intervalo*5))} mortes</option>
             <option value='class6'>{Math.floor(min+(intervalo*5))} - {Math.floor(min+(intervalo*6))} mortes</option>
             <option value='class7'>{Math.floor(min+(intervalo*6))} - {Math.floor(min+(intervalo*7))} mortes</option>
             <option value='class8'>{Math.floor(min+(intervalo*7))} - {Math.floor(min+(intervalo*8))} mortes</option>
             <option value='class9'>{Math.floor(min+(intervalo*8))} - {max} mortes</option>
          </select>
        </div>
        <div style={{width:'100%'}}>
          <div className='progressbar'>
            <div className='display' onMouseDown={() => mouseClick()} onMouseUp={() =>mouseClick()} onMouseMove={(event) => moverMouse(event)}></div>
          </div>
        </div>
      </div>
      <div className='Map'>
        <ReactMapGL
          initialViewState={{
            latitude: -6.11839,
            longitude: -38.5434,
            zoom: 6
          }}

          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxAccessToken={MAPBOX_TOKEN}>
            {cordenadas.map((item, index) =>(
                <Marker key={index}  latitude={item.lat} longitude={item.lng} anchor="bottom" >
                <div id={checarclasse(mortes[index])? 'ponto show': 'ponto'} style={{
                  width:mortes[index]*0.1+'px', 
                  height:mortes[index]*0.1+'px',
                  minHeight:'5px',
                  minWidth:'5px', 
                  maxWidth:'50px', 
                  maxHeight:'50px', 
                  backgroundColor:colors[Math.floor(Math.random() * (colors.length - 0 + 1)) + 0]}} 
                  className='img'>
                    <div >{mortes[index]} mortes</div>
                </div>
              </Marker>

              ))}
      </ReactMapGL>
      </div>
    </div>
  );
}
export default App;
