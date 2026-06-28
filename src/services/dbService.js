import { db } from '../firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  getDoc
} from 'firebase/firestore';

const SYSTEMS_COLLECTION = 'portal_systems';

export const getAllSystems = async () => {
  const snapshot = await getDocs(collection(db, SYSTEMS_COLLECTION));
  const systems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return systems.sort((a, b) => (a.order || 0) - (b.order || 0));
};

export const saveSystem = async (systemData) => {
  const { id, ...data } = systemData;
  const docId = id || Date.now().toString();
  await setDoc(doc(db, SYSTEMS_COLLECTION, docId), data, { merge: true });
  return { id: docId, ...data };
};

export const deleteSystem = async (id) => {
  await deleteDoc(doc(db, SYSTEMS_COLLECTION, id));
};

export const getDefaultSystems = () => [
  {
    id: 'prod-tm',
    name: 'Producción TM',
    description: 'Registro diario de producción por sala, turno y fecha. Reportes mensuales en PDF y TXT.',
    url: 'https://coorditm.github.io/produccion-TM-radiologia/',
    icon: 'TrendingUp',
    color: 'indigo',
    order: 1
  },
  {
    id: 'ssp-portatil',
    name: 'SSP Portátil',
    description: 'Registro digital de solicitudes de radiología portátil.',
    url: 'https://coorditm.github.io/ssp-portatil/',
    icon: 'Monitor',
    color: 'cyan',
    order: 2
  },
  {
    id: 'form-google',
    name: 'Formulario Google',
    description: 'Solicitud de estudios especiales y formularios de radiodiagnóstico.',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSe7A_-gg6SnBS61lPjqgLmqr7evlFK6cl1W8BmFlktcTf5JfQ/viewform',
    icon: 'FileText',
    color: 'amber',
    order: 3
  }
];
