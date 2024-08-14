export const generateRandomNumber = () => {
  return Math.floor(Math.random() * 900000) + 100000
}

export const calculateAge = (birthDate: Date) => {
  const today = new Date()
  const birthDateObj = new Date(birthDate)

  let age = today.getFullYear() - birthDateObj.getFullYear()
  const monthDiff = today.getMonth() - birthDateObj.getMonth()
  const dayDiff = today.getDate() - birthDateObj.getDate()

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--
  }

  return age
}
