export const setUser = (context, user/* , that */) => {
  // let islogin = true
  if ((typeof user === 'undefined') || (Object.keys(user).length === 0)) {
    user = {
      uid: '',
      token: '',
      UserName: '',
      CMS_UserImie: '',
      CMS_UserNazwisko: '',
      CMS_UserDescription: '',
      CMS_UserEMail: '',
      CMS_UserPhone: '',
      CMS_Avatar: '',
      groups: [],
      kontrahent: {
        id_kontr: '',
        nazwa: '',
        symbol_nr_ident: '',
        nr_ident: '',
        kod_pocztowy: '',
        miejscowosc: '',
        ulica: '',
        telefon: '',
        email: '',
        powiat: '',
        gmina: '',
        kod_wojewodztwa: '',
        kod_kraju: '',
        kod_powiatu: ''
      }
    }
    // islogin = false
  }
  // console.log('setUser: ' + JSON.stringify(user, null, 4))
  context.commit('setUser_Token', user.token || '')
  context.commit('setUser_UID', user.uid)
  context.commit('setUser_UserName', user.UserName)
  context.commit('setUser_FirstName', user.CMS_UserImie)
  context.commit('setUser_LastName', user.CMS_UserNazwisko)
  context.commit('setUser_Description', user.CMS_UserDescription)
  context.commit('setUser_EMail', user.CMS_UserEMail)
  context.commit('setUser_Phone', user.CMS_UserPhone)
  context.commit('setUser_Avatar', user.CMS_Avatar)
  context.commit('setUser_groups', user.groups)
  context.commit('setUser_kontrahent', user.kontrahent)
  /*
  if (typeof that !== 'undefined') {
    if (islogin) {
      that.$emit('after-login')
    } else {
      that.$emit('after-logout')
    }
  }
  */
}
