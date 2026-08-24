import type { Area, Expert } from "./types"

const experts: Record<string, Expert[]> = {
  koramangala: [
    { name: 'Priya S.', rating: 4.8, bookings: 312, photo: '👩' },
    { name: 'Anjali M.', rating: 4.7, bookings: 287, photo: '👩' },
    { name: 'Ravi K.', rating: 4.6, bookings: 198, photo: '👨' },
    { name: 'Deepa N.', rating: 4.9, bookings: 445, photo: '👩' },
    { name: 'Suresh B.', rating: 4.5, bookings: 156, photo: '👨' },
  ],
  'hsr-layout': [
    { name: 'Deepa R.', rating: 4.9, bookings: 445, photo: '👩' },
    { name: 'Suresh P.', rating: 4.5, bookings: 156, photo: '👨' },
    { name: 'Kavitha N.', rating: 4.7, bookings: 267, photo: '👩' },
    { name: 'Manoj T.', rating: 4.8, bookings: 334, photo: '👨' },
    { name: 'Lakshmi V.', rating: 4.6, bookings: 189, photo: '👩' },
  ],
  bellandur: [
    { name: 'Meena L.', rating: 4.7, bookings: 278, photo: '👩' },
    { name: 'Kiran D.', rating: 4.6, bookings: 203, photo: '👨' },
    { name: 'Lakshmi B.', rating: 4.8, bookings: 342, photo: '👩' },
    { name: 'Rajesh G.', rating: 4.5, bookings: 167, photo: '👨' },
    { name: 'Swathi K.', rating: 4.9, bookings: 412, photo: '👩' },
  ],
  indiranagar: [
    { name: 'Aisha N.', rating: 4.8, bookings: 356, photo: '👩' },
    { name: 'Vikram T.', rating: 4.5, bookings: 167, photo: '👨' },
    { name: 'Neha G.', rating: 4.9, bookings: 412, photo: '👩' },
    { name: 'Arjun M.', rating: 4.7, bookings: 234, photo: '👨' },
    { name: 'Divya H.', rating: 4.6, bookings: 198, photo: '👩' },
  ],
  jayanagar: [
    { name: 'Shobha T.', rating: 4.9, bookings: 423, photo: '👩' },
    { name: 'Ganesh K.', rating: 4.5, bookings: 134, photo: '👨' },
    { name: 'Usha D.', rating: 4.7, bookings: 212, photo: '👩' },
    { name: 'Prakash R.', rating: 4.8, bookings: 301, photo: '👨' },
    { name: 'Vidya S.', rating: 4.6, bookings: 178, photo: '👩' },
  ],
  'jp-nagar': [
    { name: 'Vani M.', rating: 4.7, bookings: 245, photo: '👩' },
    { name: 'Srinivas R.', rating: 4.6, bookings: 167, photo: '👨' },
    { name: 'Bhavani S.', rating: 4.8, bookings: 312, photo: '👩' },
    { name: 'Karthik L.', rating: 4.5, bookings: 145, photo: '👨' },
    { name: 'Roopa P.', rating: 4.9, bookings: 389, photo: '👩' },
  ],
  'btm-layout': [
    { name: 'Padma R.', rating: 4.6, bookings: 178, photo: '👩' },
    { name: 'Rajesh S.', rating: 4.7, bookings: 234, photo: '👨' },
    { name: 'Geeta P.', rating: 4.8, bookings: 301, photo: '👩' },
    { name: 'Naveen K.', rating: 4.5, bookings: 156, photo: '👨' },
    { name: 'Shanti L.', rating: 4.7, bookings: 223, photo: '👩' },
  ],
  basavanagudi: [
    { name: 'Hema R.', rating: 4.9, bookings: 423, photo: '👩' },
    { name: 'Chandrashekar K.', rating: 4.5, bookings: 134, photo: '👨' },
    { name: 'Rukmini D.', rating: 4.7, bookings: 212, photo: '👩' },
    { name: 'Venkatesh M.', rating: 4.8, bookings: 289, photo: '👨' },
    { name: 'Suma B.', rating: 4.6, bookings: 167, photo: '👩' },
  ],
  malleshwaram: [
    { name: 'Roopa V.', rating: 4.9, bookings: 445, photo: '👩' },
    { name: 'Vinayak S.', rating: 4.6, bookings: 178, photo: '👨' },
    { name: 'Shakuntala M.', rating: 4.7, bookings: 234, photo: '👩' },
    { name: 'Girish N.', rating: 4.8, bookings: 312, photo: '👨' },
    { name: 'Vani L.', rating: 4.5, bookings: 145, photo: '👩' },
  ],
  'frazer-town': [
    { name: 'Fathima B.', rating: 4.8, bookings: 334, photo: '👩' },
    { name: 'Imran K.', rating: 4.5, bookings: 145, photo: '👨' },
    { name: 'Nazreen S.', rating: 4.7, bookings: 256, photo: '👩' },
    { name: 'Ashraf M.', rating: 4.6, bookings: 189, photo: '👨' },
    { name: 'Zareena T.', rating: 4.8, bookings: 301, photo: '👩' },
  ],
  'shivaji-nagar': [
    { name: 'Vidya L.', rating: 4.7, bookings: 267, photo: '👩' },
    { name: 'Mohammed A.', rating: 4.6, bookings: 178, photo: '👨' },
    { name: 'Zareena T.', rating: 4.8, bookings: 312, photo: '👩' },
    { name: 'Irfan S.', rating: 4.5, bookings: 134, photo: '👨' },
    { name: 'Nasreen P.', rating: 4.7, bookings: 223, photo: '👩' },
  ],
  rajajinagar: [
    { name: 'Jayashree K.', rating: 4.8, bookings: 334, photo: '👩' },
    { name: 'Prakash N.', rating: 4.5, bookings: 156, photo: '👨' },
    { name: 'Latha G.', rating: 4.7, bookings: 267, photo: '👩' },
    { name: 'Srinivas T.', rating: 4.6, bookings: 189, photo: '👨' },
    { name: 'Vasanthi R.', rating: 4.8, bookings: 312, photo: '👩' },
  ],
  vijayanagar: [
    { name: 'Suchitra N.', rating: 4.8, bookings: 323, photo: '👩' },
    { name: 'Ravindra S.', rating: 4.5, bookings: 145, photo: '👨' },
    { name: 'Jyothi K.', rating: 4.7, bookings: 234, photo: '👩' },
    { name: 'Mahesh P.', rating: 4.6, bookings: 178, photo: '👨' },
    { name: 'Padmavathi L.', rating: 4.9, bookings: 389, photo: '👩' },
  ],
  whitefield: [
    { name: 'Sunita V.', rating: 4.7, bookings: 298, photo: '👩' },
    { name: 'Manoj J.', rating: 4.6, bookings: 189, photo: '👨' },
    { name: 'Divya H.', rating: 4.8, bookings: 334, photo: '👩' },
    { name: 'Vikram S.', rating: 4.5, bookings: 156, photo: '👨' },
    { name: 'Nandini K.', rating: 4.9, bookings: 412, photo: '👩' },
  ],
  marathahalli: [
    { name: 'Divya R.', rating: 4.8, bookings: 345, photo: '👩' },
    { name: 'Amit K.', rating: 4.5, bookings: 134, photo: '👨' },
    { name: 'Nirmala S.', rating: 4.7, bookings: 223, photo: '👩' },
    { name: 'Rajiv P.', rating: 4.6, bookings: 178, photo: '👨' },
    { name: 'Kavitha M.', rating: 4.8, bookings: 301, photo: '👩' },
  ],
  'electronic-city': [
    { name: 'Rekha C.', rating: 4.8, bookings: 367, photo: '👩' },
    { name: 'Arun M.', rating: 4.5, bookings: 145, photo: '👨' },
    { name: 'Swathi K.', rating: 4.7, bookings: 256, photo: '👩' },
    { name: 'Rajiv S.', rating: 4.6, bookings: 189, photo: '👨' },
    { name: 'Nirmala B.', rating: 4.8, bookings: 312, photo: '👩' },
  ],
  banashankari: [
    { name: 'Chitra L.', rating: 4.6, bookings: 189, photo: '👩' },
    { name: 'Naveen P.', rating: 4.7, bookings: 223, photo: '👨' },
    { name: 'Suma B.', rating: 4.8, bookings: 298, photo: '👩' },
    { name: 'Girish K.', rating: 4.5, bookings: 156, photo: '👨' },
    { name: 'Vani R.', rating: 4.7, bookings: 234, photo: '👩' },
  ],
  'kumaraswamy-layout': [
    { name: 'Bhavya S.', rating: 4.7, bookings: 245, photo: '👩' },
    { name: 'Darshan P.', rating: 4.6, bookings: 167, photo: '👨' },
    { name: 'Kavya M.', rating: 4.8, bookings: 301, photo: '👩' },
    { name: 'Naveen K.', rating: 4.5, bookings: 134, photo: '👨' },
    { name: 'Shilpa R.', rating: 4.9, bookings: 378, photo: '👩' },
  ],
  hebbal: [
    { name: 'Kavita J.', rating: 4.7, bookings: 256, photo: '👩' },
    { name: 'Raghavendra R.', rating: 4.6, bookings: 189, photo: '👨' },
    { name: 'Poornima D.', rating: 4.8, bookings: 312, photo: '👩' },
    { name: 'Vinay S.', rating: 4.5, bookings: 145, photo: '👨' },
    { name: 'Lakshmi H.', rating: 4.9, bookings: 389, photo: '👩' },
  ],
  yelahanka: [
    { name: 'Sunitha V.', rating: 4.7, bookings: 234, photo: '👩' },
    { name: 'Jagadish P.', rating: 4.6, bookings: 156, photo: '👨' },
    { name: 'Kamala N.', rating: 4.8, bookings: 301, photo: '👩' },
    { name: 'Rajesh K.', rating: 4.5, bookings: 134, photo: '👨' },
    { name: 'Vani S.', rating: 4.7, bookings: 223, photo: '👩' },
  ],
  'sarjapur-road': [
    { name: 'Anitha P.', rating: 4.7, bookings: 267, photo: '👩' },
    { name: 'Karthik L.', rating: 4.6, bookings: 178, photo: '👨' },
    { name: 'Vasanthi T.', rating: 4.8, bookings: 301, photo: '👩' },
    { name: 'Ramesh K.', rating: 4.5, bookings: 156, photo: '👨' },
    { name: 'Lakshmi N.', rating: 4.9, bookings: 389, photo: '👩' },
  ],
  'bannerghatta-road': [
    { name: 'Mahalakshmi N.', rating: 4.8, bookings: 323, photo: '👩' },
    { name: 'Gopal K.', rating: 4.5, bookings: 145, photo: '👨' },
    { name: 'Revathi S.', rating: 4.7, bookings: 245, photo: '👩' },
    { name: 'Venkatesh R.', rating: 4.6, bookings: 189, photo: '👨' },
    { name: 'Suma L.', rating: 4.8, bookings: 301, photo: '👩' },
  ],
  kengeri: [
    { name: 'Parvathi R.', rating: 4.6, bookings: 167, photo: '👩' },
    { name: 'Ramesh B.', rating: 4.7, bookings: 212, photo: '👨' },
    { name: 'Shylaja M.', rating: 4.8, bookings: 289, photo: '👩' },
    { name: 'Naveen K.', rating: 4.5, bookings: 134, photo: '👨' },
    { name: 'Kavitha S.', rating: 4.7, bookings: 223, photo: '👩' },
  ],
  'kr-puram': [
    { name: 'Lalitha K.', rating: 4.8, bookings: 312, photo: '👩' },
    { name: 'Suresh N.', rating: 4.5, bookings: 134, photo: '👨' },
    { name: 'Padmavathi S.', rating: 4.7, bookings: 223, photo: '👩' },
    { name: 'Ganesh R.', rating: 4.6, bookings: 189, photo: '👨' },
    { name: 'Shobha T.', rating: 4.9, bookings: 367, photo: '👩' },
  ],
  hoodi: [
    { name: 'Vijayalakshmi R.', rating: 4.7, bookings: 245, photo: '👩' },
    { name: 'Narasimha M.', rating: 4.6, bookings: 167, photo: '👨' },
    { name: 'Shailaja P.', rating: 4.8, bookings: 298, photo: '👩' },
    { name: 'Prasad K.', rating: 4.5, bookings: 145, photo: '👨' },
    { name: 'Vanitha S.', rating: 4.7, bookings: 234, photo: '👩' },
  ],
  itpl: [
    { name: 'Rekha V.', rating: 4.8, bookings: 323, photo: '👩' },
    { name: 'Anil K.', rating: 4.5, bookings: 145, photo: '👨' },
    { name: 'Sudha M.', rating: 4.7, bookings: 223, photo: '👩' },
    { name: 'Ravi P.', rating: 4.6, bookings: 178, photo: '👨' },
    { name: 'Lakshmi N.', rating: 4.9, bookings: 389, photo: '👩' },
  ],
  brookefield: [
    { name: 'Meera S.', rating: 4.7, bookings: 234, photo: '👩' },
    { name: 'Kiran B.', rating: 4.6, bookings: 189, photo: '👨' },
    { name: 'Aparna R.', rating: 4.8, bookings: 301, photo: '👩' },
    { name: 'Suresh L.', rating: 4.5, bookings: 156, photo: '👨' },
    { name: 'Deepa K.', rating: 4.7, bookings: 223, photo: '👩' },
  ],
  kadugodi: [
    { name: 'Sunitha P.', rating: 4.6, bookings: 178, photo: '👩' },
    { name: 'Rajesh T.', rating: 4.7, bookings: 223, photo: '👨' },
    { name: 'Kavitha G.', rating: 4.8, bookings: 289, photo: '👩' },
    { name: 'Venkatesh N.', rating: 4.5, bookings: 145, photo: '👨' },
    { name: 'Vani R.', rating: 4.9, bookings: 356, photo: '👩' },
  ],
  varthur: [
    { name: 'Nandini S.', rating: 4.7, bookings: 245, photo: '👩' },
    { name: 'Prakash K.', rating: 4.6, bookings: 167, photo: '👨' },
    { name: 'Shylaja M.', rating: 4.8, bookings: 301, photo: '👩' },
    { name: 'Ramesh V.', rating: 4.5, bookings: 134, photo: '👨' },
    { name: 'Geetha L.', rating: 4.7, bookings: 223, photo: '👩' },
  ],
  gunjur: [
    { name: 'Latha K.', rating: 4.6, bookings: 178, photo: '👩' },
    { name: 'Srinivas P.', rating: 4.7, bookings: 223, photo: '👨' },
    { name: 'Vasanthi N.', rating: 4.8, bookings: 289, photo: '👩' },
    { name: 'Mahesh R.', rating: 4.5, bookings: 145, photo: '👨' },
    { name: 'Suma T.', rating: 4.9, bookings: 356, photo: '👩' },
  ],
  jakkur: [
    { name: 'Nandini R.', rating: 4.7, bookings: 234, photo: '👩' },
    { name: 'Suresh K.', rating: 4.6, bookings: 178, photo: '👨' },
    { name: 'Deepa M.', rating: 4.8, bookings: 289, photo: '👩' },
    { name: 'Ganesh P.', rating: 4.5, bookings: 145, photo: '👨' },
    { name: 'Kavitha L.', rating: 4.9, bookings: 367, photo: '👩' },
  ],
  thanisandra: [
    { name: 'Vidya N.', rating: 4.6, bookings: 178, photo: '👩' },
    { name: 'Rajiv S.', rating: 4.7, bookings: 223, photo: '👨' },
    { name: 'Shilpa K.', rating: 4.8, bookings: 289, photo: '👩' },
    { name: 'Prakash R.', rating: 4.5, bookings: 145, photo: '👨' },
    { name: 'Geetha V.', rating: 4.7, bookings: 234, photo: '👩' },
  ],
  'kalyan-nagar': [
    { name: 'Swathi P.', rating: 4.8, bookings: 312, photo: '👩' },
    { name: 'Vikram R.', rating: 4.5, bookings: 145, photo: '👨' },
    { name: 'Neha K.', rating: 4.7, bookings: 223, photo: '👩' },
    { name: 'Arjun S.', rating: 4.6, bookings: 178, photo: '👨' },
    { name: 'Divya M.', rating: 4.9, bookings: 389, photo: '👩' },
  ],
  hennur: [
    { name: 'Lakshmi R.', rating: 4.7, bookings: 234, photo: '👩' },
    { name: 'Rajesh K.', rating: 4.6, bookings: 178, photo: '👨' },
    { name: 'Kavitha S.', rating: 4.8, bookings: 289, photo: '👩' },
    { name: 'Prasad N.', rating: 4.5, bookings: 145, photo: '👨' },
    { name: 'Vani L.', rating: 4.7, bookings: 223, photo: '👩' },
  ],
  banaswadi: [
    { name: 'Shobha M.', rating: 4.7, bookings: 234, photo: '👩' },
    { name: 'Naveen K.', rating: 4.6, bookings: 178, photo: '👨' },
    { name: 'Geetha R.', rating: 4.8, bookings: 289, photo: '👩' },
    { name: 'Suresh P.', rating: 4.5, bookings: 145, photo: '👨' },
    { name: 'Padma V.', rating: 4.9, bookings: 367, photo: '👩' },
  ],
  kammanahalli: [
    { name: 'Nisha K.', rating: 4.6, bookings: 178, photo: '👩' },
    { name: 'Rajiv S.', rating: 4.7, bookings: 223, photo: '👨' },
    { name: 'Shweta R.', rating: 4.8, bookings: 289, photo: '👩' },
    { name: 'Ashok M.', rating: 4.5, bookings: 145, photo: '👨' },
    { name: 'Vidya P.', rating: 4.7, bookings: 234, photo: '👩' },
  ],
  nagarbhavi: [
    { name: 'Latha P.', rating: 4.7, bookings: 234, photo: '👩' },
    { name: 'Suresh K.', rating: 4.6, bookings: 178, photo: '👨' },
    { name: 'Geetha N.', rating: 4.8, bookings: 289, photo: '👩' },
    { name: 'Rajesh V.', rating: 4.5, bookings: 145, photo: '👨' },
    { name: 'Vasanthi M.', rating: 4.9, bookings: 367, photo: '👩' },
  ],
  'sahakar-nagar': [
    { name: 'Prema K.', rating: 4.6, bookings: 189, photo: '👩' },
    { name: 'Sunil R.', rating: 4.7, bookings: 234, photo: '👨' },
    { name: 'Geetha N.', rating: 4.8, bookings: 298, photo: '👩' },
    { name: 'Ramesh V.', rating: 4.5, bookings: 156, photo: '👨' },
    { name: 'Kavitha S.', rating: 4.9, bookings: 367, photo: '👩' },
  ],
  'basaveshwara-nagar': [
    { name: 'Shylaja R.', rating: 4.7, bookings: 245, photo: '👩' },
    { name: 'Nagaraj K.', rating: 4.6, bookings: 167, photo: '👨' },
    { name: 'Bharathi M.', rating: 4.8, bookings: 301, photo: '👩' },
    { name: 'Gopal S.', rating: 4.5, bookings: 134, photo: '👨' },
    { name: 'Sunitha V.', rating: 4.7, bookings: 223, photo: '👩' },
  ],
}

const areaNames: Record<string, string> = {
  koramangala: "Koramangala",
  "hsr-layout": "HSR Layout",
  bellandur: "Bellandur",
  indiranagar: "Indiranagar",
  jayanagar: "Jayanagar",
  "jp-nagar": "JP Nagar",
  "btm-layout": "BTM Layout",
  basavanagudi: "Basavanagudi",
  malleshwaram: "Malleshwaram",
  "frazer-town": "Frazer Town",
  "shivaji-nagar": "Shivaji Nagar",
  rajajinagar: "Rajajinagar",
  vijayanagar: "Vijayanagar",
  whitefield: "Whitefield",
  marathahalli: "Marathahalli",
  "electronic-city": "Electronic City",
  banashankari: "Banashankari",
  "kumaraswamy-layout": "Kumaraswamy Layout",
  hebbal: "Hebbal",
  yelahanka: "Yelahanka",
  "sarjapur-road": "Sarjapur Road",
  "bannerghatta-road": "Bannerghatta Road",
  kengeri: "Kengeri",
  "kr-puram": "KR Puram",
  hoodi: "Hoodi",
  itpl: "ITPL",
  brookefield: "Brookefield",
  kadugodi: "Kadugodi",
  varthur: "Varthur",
  gunjur: "Gunjur",
  jakkur: "Jakkur",
  thanisandra: "Thanisandra",
  "kalyan-nagar": "Kalyan Nagar",
  hennur: "Hennur",
  banaswadi: "Banaswadi",
  kammanahalli: "Kammanahalli",
  nagarbhavi: "Nagarbhavi",
  "sahakar-nagar": "Sahakar Nagar",
  "basaveshwara-nagar": "Basaveshwara Nagar",
}

export function resolveArea(text: string): string | undefined {
  const lower = text.toLowerCase()
  if (lower.includes('koramangala')) return 'koramangala'
  if (lower.includes('hsr')) return 'hsr-layout'
  if (lower.includes('bellandur')) return 'bellandur'
  if (lower.includes('indiranagar')) return 'indiranagar'
  if (lower.includes('jayanagar')) return 'jayanagar'
  if (lower.includes('jp nagar') || lower.includes('j.p. nagar')) return 'jp-nagar'
  if (lower.includes('btm')) return 'btm-layout'
  if (lower.includes('basavanagudi')) return 'basavanagudi'
  if (lower.includes('malleshwaram') || lower.includes('malleshwara')) return 'malleshwaram'
  if (lower.includes('frazer') || lower.includes('fraser')) return 'frazer-town'
  if (lower.includes('shivaji')) return 'shivaji-nagar'
  if (lower.includes('sahakar')) return 'sahakar-nagar'
  if (lower.includes('rajajinagar') || lower.includes('rajaji nagar')) return 'rajajinagar'
  if (lower.includes('vijayanagar') || lower.includes('vijayanagara')) return 'vijayanagar'
  if (lower.includes('basaveshwara')) return 'basaveshwara-nagar'
  if (lower.includes('whitefield')) return 'whitefield'
  if (lower.includes('marathahalli') || lower.includes('marathahalli')) return 'marathahalli'
  if (lower.includes('kr puram') || lower.includes('k.r. puram')) return 'kr-puram'
  if (lower.includes('hoodi')) return 'hoodi'
  if (lower.includes('itpl')) return 'itpl'
  if (lower.includes('brookefield')) return 'brookefield'
  if (lower.includes('kadugodi')) return 'kadugodi'
  if (lower.includes('varthur')) return 'varthur'
  if (lower.includes('gunjur')) return 'gunjur'
  if (lower.includes('electronic city phase 1') || lower.includes('e-city phase 1')) return 'electronic-city-phase-1'
  if (lower.includes('electronic city phase 2') || lower.includes('e-city phase 2')) return 'electronic-city-phase-2'
  if (lower.includes('electronic city') || lower.includes('e-city')) return 'electronic-city'
  if (lower.includes('banashankari')) return 'banashankari'
  if (lower.includes('kumaraswamy')) return 'kumaraswamy-layout'
  if (lower.includes('hebbal')) return 'hebbal'
  if (lower.includes('yelahanka')) return 'yelahanka'
  if (lower.includes('jakkur')) return 'jakkur'
  if (lower.includes('thanisandra')) return 'thanisandra'
  if (lower.includes('kalyan nagar') || lower.includes('kalyannagar')) return 'kalyan-nagar'
  if (lower.includes('hennur')) return 'hennur'
  if (lower.includes('banaswadi')) return 'banaswadi'
  if (lower.includes('kammanahalli')) return 'kammanahalli'
  if (lower.includes('sarjapur')) return 'sarjapur-road'
  if (lower.includes('bannerghatta')) return 'bannerghatta-road'
  if (lower.includes('kengeri')) return 'kengeri'
  if (lower.includes('nagarbhavi')) return 'nagarbhavi'
  return undefined
}export function getArea(slug: string): Area | undefined {
  const e = experts[slug]
  if (!e) return undefined
  return {
    slug,
    name: areaNames[slug],
    experts: e,
    availableServices: ['dishwashing', 'kitchen', 'fullhouse', 'laundry', 'bathroom', 'sofa', 'ac', 'pest', 'painting', 'plumbing', 'electrical', 'deepclean'],
  }
}

export function getAreas(): Area[] {
  return Object.keys(experts).map((slug) => getArea(slug)!)
}

export function randomExpert(slug: string): Expert | undefined {
  const e = experts[slug]
  return e ? e[Math.floor(Math.random() * e.length)] : undefined
}

export function getEta(): string {
  return `${10 + Math.floor(Math.random() * 15)} min`
}

export function getArrivalSlot(): string {
  const now = new Date()
  now.setMinutes(now.getMinutes() + 15 + Math.floor(Math.random() * 15))
  return now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}

const areaCoords: Record<string, { lat: number; lng: number }> = {
  koramangala: { lat: 12.9352, lng: 77.6245 },
  'hsr-layout': { lat: 12.9116, lng: 77.6389 },
  bellandur: { lat: 12.9260, lng: 77.6762 },
  indiranagar: { lat: 12.9784, lng: 77.6408 },
  jayanagar: { lat: 12.9295, lng: 77.5830 },
  'jp-nagar': { lat: 12.8910, lng: 77.5850 },
  'btm-layout': { lat: 12.9165, lng: 77.6113 },
  basavanagudi: { lat: 12.9410, lng: 77.5630 },
  malleshwaram: { lat: 13.0030, lng: 77.5690 },
  'frazer-town': { lat: 12.9930, lng: 77.5930 },
  'shivaji-nagar': { lat: 12.9900, lng: 77.5750 },
  rajajinagar: { lat: 12.9950, lng: 77.5530 },
  vijayanagar: { lat: 12.9780, lng: 77.5430 },
  whitefield: { lat: 12.9698, lng: 77.7500 },
  marathahalli: { lat: 12.9560, lng: 77.6970 },
  'electronic-city': { lat: 12.8450, lng: 77.6600 },
  banashankari: { lat: 12.9250, lng: 77.5450 },
  'kumaraswamy-layout': { lat: 12.9130, lng: 77.5600 },
  hebbal: { lat: 13.0350, lng: 77.5970 },
  yelahanka: { lat: 13.1000, lng: 77.5960 },
  'sarjapur-road': { lat: 12.8880, lng: 77.6800 },
  'bannerghatta-road': { lat: 12.8800, lng: 77.6000 },
  kengeri: { lat: 12.9170, lng: 77.4830 },
  'kr-puram': { lat: 12.9960, lng: 77.6780 },
  hoodi: { lat: 12.9940, lng: 77.7270 },
  itpl: { lat: 12.9880, lng: 77.7450 },
  brookefield: { lat: 12.9700, lng: 77.7200 },
  kadugodi: { lat: 12.9800, lng: 77.7600 },
  varthur: { lat: 12.9360, lng: 77.7400 },
  gunjur: { lat: 12.8800, lng: 77.7200 },
  jakkur: { lat: 13.0450, lng: 77.6100 },
  thanisandra: { lat: 13.0200, lng: 77.6150 },
  'kalyan-nagar': { lat: 13.0130, lng: 77.6150 },
  hennur: { lat: 13.0250, lng: 77.6350 },
  banaswadi: { lat: 12.9960, lng: 77.6500 },
  kammanahalli: { lat: 13.0050, lng: 77.6450 },
  nagarbhavi: { lat: 12.9850, lng: 77.5100 },
  'sahakar-nagar': { lat: 13.0100, lng: 77.5850 },
  'basaveshwara-nagar': { lat: 12.9900, lng: 77.5600 },
}

export function getGoogleMapsLink(areaSlug: string): string {
  const coords = areaCoords[areaSlug]
  if (!coords) return `https://www.google.com/maps/search/${encodeURIComponent(areaNames[areaSlug] ?? areaSlug + ', Bangalore')}`
  return `https://www.google.com/maps?q=${coords.lat},${coords.lng}`
}

export function generateOTP(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}