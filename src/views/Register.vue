<template>
  <div class="register-back">
    <h2 style="color:white">Kaydol</h2>
    <a-modal :footer="null" v-model="kvkShow">
      {{ kvkk }}
    </a-modal>
    <a-divider></a-divider>
    <a-form class="regiter-form">
      <a-form-item>
        <template v-slot:label>
          <span style="color:white">
            Ad Soyad
          </span>
        </template>
        <a-input
          class="register-input"
          v-model="registerData.fullName"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <template v-slot:label>
          <span style="color:white">
            Kullanıcı adı
          </span>
        </template>
        <a-input
          class="register-input"
          v-model="registerData.username"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <template v-slot:label>
          <span style="color:white">
            Email
          </span>
        </template>
        <a-input class="register-input" v-model="registerData.email"></a-input>
      </a-form-item>
      <a-form-item>
        <template v-slot:label>
          <span style="color:white">
            Parola
          </span>
        </template>
        <a-input
          class="register-input"
          v-model="registerData.password"
          type="password"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <template v-slot:label>
          <span style="color:white">
            Parola Onay
          </span>
        </template>
        <a-input
          class="register-input"
          v-model="registerData.password2"
          type="password"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <template v-slot:label>
          <span style="color:white">
            Adres
          </span>
        </template>
        <a-textarea
          class="register-input"
          v-model="registerData.address"
        ></a-textarea>
      </a-form-item>
      <a-form-item v-if="errorText">
        <a-alert v-if="errorText" type="error" :message="errorText" banner />
      </a-form-item>
      <div class="mb-4 text-light">
        <a-checkbox v-model="kvkkChecked"></a-checkbox
        ><span
          @click="kvkShow = true"
          style="color:lightblue;text-decoration:underline;cursor:pointer;margin-left:6px"
          >Kullanım Koşullarını</span
        >
        okudum ve kabul ediyorum.
      </div>
      <a-form-item>
        <a-button
          :disabled="!kvkkChecked"
          :loading="registerLoading"
          @click="clickRegister"
          ghost
          shape="round"
          block
          size="large"
          >Kaydol</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import router from "../router";
export default {
  data() {
    return {
      registerLoading: false,
      errorText: null,
      registerData: {
        fullName: null,
        username: null,
        email: null,
        password: null,
        password2: null,
        address: null
      },
      kvkShow: false,
      kvkkChecked: false,
      kvkk: `SİTE KULLANIM ŞARTLARI Lütfen sitemizi kullanmadan evvel bu ‘site kullanım şartları’nı dikkatlice okuyunuz. KahveciApp uygulamasın kullanan üyelerimiz aşağıdaki şartları kabul etmiş varsayılmaktadır: Sitemizdeki web sayfaları ve ona bağlı tüm sayfalar Kahveci'nindir ve onun tarafından işletilir. Sizler (‘Kullanıcı’) sitede sunulan tüm hizmetleri kullanırken aşağıdaki şartlara tabi olduğunuzu, sitedeki hizmetten yararlanmakla ve kullanmaya devam etmekle; Bağlı olduğunuz yasalara göre sözleşme imzalama hakkına, yetkisine ve hukuki ehliyetine sahip ve 18 yaşın üzerinde olduğunuzu, bu sözleşmeyi okuduğunuzu, anladığınızı ve sözleşmede yazan şartlarla bağlı olduğunuzu kabul etmiş sayılırsınız. İşbu sözleşme taraflara sözleşme konusu site ile ilgili hak ve yükümlülükler yükler ve taraflar işbu sözleşmeyi kabul ettiklerinde bahsi geçen hak ve yükümlülükleri eksiksiz, doğru, zamanında, işbu sözleşmede talep edilen şartlar dâhilinde yerine getireceklerini beyan ederler. 1. SORUMLULUKLAR a.Kulüp, etkinlikler, duyurular vs. üzerinde değişiklik yapma hakkını her zaman saklı tutar. b.Firma, üyenin sözleşme konusu hizmetlerden, teknik arızalar dışında yararlandırılacağını kabul ve taahhüt eder. c.Kullanıcı, sitenin kullanımında tersine mühendislik yapmayacağını ya da bunların kaynak kodunu bulmak veya elde etmek amacına yönelik herhangi bir başka işlemde bulunmayacağını aksi halde ve 3. Kişiler nezdinde doğacak zararlardan sorumlu olacağını, hakkında hukuki ve cezai işlem yapılacağını peşinen kabul eder. d.Kullanıcı, site içindeki faaliyetlerinde, sitenin herhangi bir bölümünde veya iletişimlerinde genel ahlaka ve adaba aykırı, kanuna aykırı, 3. Kişilerin haklarını zedeleyen, yanıltıcı, saldırgan, müstehcen, pornografik, kişilik haklarını zedeleyen, telif haklarına aykırı, yasa dışı faaliyetleri teşvik eden içerikler üretmeyeceğini, paylaşmayacağını kabul eder. Aksi halde oluşacak zarardan tamamen kendisi sorumludur ve bu durumda ‘Site’ yetkilileri, bu tür hesapları askıya alabilir, sona erdirebilir, yasal süreç başlatma hakkını saklı tutar. Bu sebeple yargı mercilerinden etkinlik veya kullanıcı hesapları ile ilgili bilgi talepleri gelirse paylaşma hakkını saklı tutar. e.Sitenin üyelerinin birbirleri veya üçüncü şahıslarla olan ilişkileri kendi sorumluluğundadır. 2. Fikri Mülkiyet Hakları 2.1. İşbu Site’de yer alan ünvan, işletme adı, marka, patent, logo, tasarım, bilgi ve yöntem gibi tescilli veya tescilsiz tüm fikri mülkiyet hakları site işleteni ve sahibi firmaya veya belirtilen ilgilisine ait olup, ulusal ve uluslararası hukukun koruması altındadır. İşbu Site’nin ziyaret edilmesi veya bu Site’deki hizmetlerden yararlanılması söz konusu fikri mülkiyet hakları konusunda hiçbir hak vermez. 2.2. Site’de yer alan bilgiler hiçbir şekilde çoğaltılamaz, yayınlanamaz, kopyalanamaz, sunulamaz ve/veya aktarılamaz. Site’nin bütünü veya bir kısmı diğer bir internet sitesinde izinsiz olarak kullanılamaz. 3. Gizli Bilgi 3.1. Kullanıcı, sadece tanıtım, reklam, kampanya, promosyon, duyuru vb. pazarlama faaliyetleri kapsamında kullanılması ile sınırlı olmak üzere, Site’nin sahibi olan firmanın kendisine ait iletişim, portföy durumu ve demografik bilgilerini iştirakleri ya da bağlı bulunduğu grup şirketleri ile paylaşmasına muvafakat ettiğini kabul ve beyan eder. Bu kişisel bilgiler firma bünyesinde müşteri profili belirlemek, müşteri profiline uygun promosyon ve kampanyalar sunmak ve istatistiksel çalışmalar yapmak amacıyla kullanılabilecektir. 4. Garanti Vermeme: İŞBU SÖZLEŞME MADDESİ UYGULANABİLİR KANUNUN İZİN VERDİĞİ AZAMİ ÖLÇÜDE GEÇERLİ OLACAKTIR. FİRMA TARAFINDAN SUNULAN HİZMETLER "OLDUĞU GİBİ” VE "MÜMKÜN OLDUĞU” TEMELDE SUNULMAKTA VE PAZARLANABİLİRLİK, BELİRLİ BİR AMACA UYGUNLUK VEYA İHLAL ETMEME KONUSUNDA TÜM ZIMNİ GARANTİLER DE DÂHİL OLMAK ÜZERE HİZMETLER VEYA UYGULAMA İLE İLGİLİ OLARAK (BUNLARDA YER ALAN TÜM BİLGİLER DÂHİL) SARİH VEYA ZIMNİ, KANUNİ VEYA BAŞKA BİR NİTELİKTE HİÇBİR GARANTİDE BULUNMAMAKTADIR. 5. Kayıt ve Güvenlik Kullanıcı, doğru, eksiksiz ve güncel kayıt bilgilerini vermek zorundadır. Aksi halde bu Sözleşme ihlal edilmiş sayılacak ve Kullanıcı bilgilendirilmeksizin hesap kapatılabilecektir. Kullanıcı, site ve üçüncü taraf sitelerdeki şifre ve hesap güvenliğinden kendisi sorumludur. Aksi halde oluşacak veri kayıplarından ve güvenlik ihlallerinden veya donanım ve cihazların zarar görmesinden Firma sorumlu tutulamaz. 6. Mücbir Sebep Tarafların kontrolünde olmayan; tabii afetler, yangın, patlamalar, iç savaşlar, savaşlar, ayaklanmalar, halk hareketleri, seferberlik ilanı, grev, lokavt ve salgın hastalıklar, altyapı ve internet arızaları, elektrik kesintisi gibi sebeplerden (aşağıda birlikte "Mücbir Sebep” olarak anılacaktır.) dolayı sözleşmeden doğan yükümlülükler taraflarca ifa edilemez hale gelirse, taraflar bundan sorumlu değildir. Bu sürede Taraflar’ın işbu Sözleşme’den doğan hak ve yükümlülükleri askıya alınır. 7. Sözleşmenin Bütünlüğü ve Uygulanabilirlik İşbu sözleşme şartlarından biri, kısmen veya tamamen geçersiz hale gelirse, sözleşmenin geri kalanı geçerliliğini korumaya devam eder. 8. Sözleşmede Yapılacak Değişiklikler Firma, dilediği zaman sitede sunulan hizmetleri ve işbu sözleşme şartlarını kısmen veya tamamen değiştirebilir. Değişiklikler sitede yayınlandığı tarihten itibaren geçerli olacaktır. Değişiklikleri takip etmek Kullanıcı’nın sorumluluğundadır. Kullanıcı, sunulan hizmetlerden yararlanmaya devam etmekle bu değişiklikleri de kabul etmiş sayılır. 9. Tebligat İşbu Sözleşme ile ilgili taraflara gönderilecek olan tüm bildirimler, Firma’nın bilinen e.posta adresi ve kullanıcının üyelik formunda belirttiği e.posta adresi vasıtasıyla yapılacaktır. Kullanıcı, üye olurken belirttiği adresin geçerli tebligat adresi olduğunu, değişmesi durumunda 5 gün içinde yazılı olarak diğer tarafa bildireceğini, aksi halde bu adrese yapılacak tebligatların geçerli sayılacağını kabul eder. 10. Delil Sözleşmesi Taraflar arasında işbu sözleşme ile ilgili işlemler için çıkabilecek her türlü uyuşmazlıklarda Taraflar’ın defter, kayıt ve belgeleri ile ve bilgisayar kayıtları ve faks kayıtları 6100 sayılı Hukuk Muhakemeleri Kanunu uyarınca delil olarak kabul edilecek olup, kullanıcı bu kayıtlara itiraz etmeyeceğini kabul eder. 11. Uyuşmazlıkların Çözümü İşbu Sözleşme’nin uygulanmasından veya yorumlanmasından doğacak her türlü uyuşmazlığın çözümünde İstanbul (Merkez) Adliyesi Mahkemeleri ve İcra Daireleri yetkilidir.`
    };
  },
  methods: {
    ...mapActions(["doRegister"]),
    async clickRegister() {
      this.registerLoading = true;
      try {
        await this.doRegister(this.registerData);
        router.push("/login");
      } catch (error) {
        this.errorText = error.response.data.message;
      }
      this.registerLoading = false;
    }
  }
};
</script>
<style scoped>
.register-back {
  padding: 16px 16px 0 16px;
}

.regiter-form label {
  color: white !important;
}
.register-input {
  border-radius: 14px !important;
  background: white;
}
</style>
