import {ReactNode} from 'react';

export type WithChildren<T = {}> = T & {children?: ReactNode};

export type KeyboardBehavior = 'padding' | 'height' | 'position' | undefined;

export type PointEvents = 'none' | 'box-none' | 'box-only' | 'auto' | undefined;

export interface Media {
  uri: string;
  name: string;
  type: string;
}

export interface ViaCep {
  uf: string;
  ddd: string;
  cep: string;
  bairro: string;
  localidade: string;
  logradouro: string;
  complemento: string;
}

export interface State {
  id: number;
  nome: string;
  sigla: string;
}

export interface Address {
  cep: string;
  city: string;
  state: string;
  number: string;
  address: string;
  district: string;
  complement: string;
  doNotHaveNumber: boolean;
}
