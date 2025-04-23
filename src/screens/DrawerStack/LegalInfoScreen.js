import { View, Text, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Accordion from 'react-native-collapsible/Accordion';
import faqAccordion from '../../components/accordion/faqAccordion';
import DrawerScreensTitle from '../../components/drawer/drawerScreensTitle';

const LegalInfoScreen = () => {
  const SECTIONS = [
    {
      title: 'Kullanıcı Aydınlatma Metni',
      content:
        'VERTEX YAZILIM KULLANICI AYDINLATMA METNİ\n' +
        'Siz kullanıcılarımızın kişisel verilerinin güvenliği sağlamak bizim en önde gelen ilkelerimizdendir. Bu ilkemizden yola çıkarak, Vertex Yazılım Aydınlatma Metni ile size;\n' +
        '\t•\tVeri Sorumlusu olarak  Vertex Yazılımın kimliği,\n' +
        '\t•\tKişisel verilerinizin Vertex Yazılım tarafindan hangi amaçla toplandığı (işlendiği)\n' +
        '\t•\tKişisel verilerinizi kimlere ve hangi amaçla aktarabileceğimizi,\n' +
        '\t•\tKişisel verilerinizi nasıl edindiğimizi ve bunun yasal nedenlerini,\n' +
        '\t•\tSon olarak kişisel verilerinizle ilgili olarak haklarınızın neler olduğunu, açıklamak isteriz.\n' +
        '\n' +
        '\n' +
        'Bu bilgileri sizlerle paylaşmadan önce, açıklanması gerekli bazı hususlar şunlardır:\n' +
        '\t•\tKişisel veri nedir? Gerçek kişinin kimliğinin belirlenmesine yarayan tüm bilgiler kişisel veridir. Örneğin; kişilerin adı, soyadı, telefon numarası, mezuniyet bilgisi kişisel verilerden bazılarıdır.\n' +
        '\t•\tVeri İşleme faaliyeti nedir? Kişisel verilerin otomatik olan ya da olmayan yollarla, yani bilişim sistemleri üzerinden veya manuel olarak; elde edilmesi, kaydedilmesi, muhafaza edilmesi, aktarılması, sınıflandırılması ya da kullanımının engellenmesi gibi her türlü işlem anlamına gelir. Örneğin, kişisel verilerinizi bizimle Vertex Yazılım dijital ürününü satın almanız sırasında paylaşmanız, bizim tarafimızdan gerçekleştirilen bir veri işleme faaliyetidir.\n' +
        '\t•\tVeri Sorumlusu Kimdir? Veri işleme faaliyetinin neden ve nasıl olacağını belirleyen gerçek ya da tüzel kişidir. Bu bakımdan, Şirketimiz bir veri sorumlusudur.\n' +
        '9251051901 Vergi Kimlik numaralı VERTEX YAZILIM ELEKTRONİK BİLİŞİM İTHALAT İHRACAT SANAYİ VE TİCARET A.Ş. ticaret unvanlı şirketimiz, bu metinde kısaca “Vertex Yazılım” olarak ifade edilecektir.\n' +
        'Vertex Yazılım, faaliyetlerini Muradiye Mah. Celal Bayar Üniversitesi Kampüsü Küme Evleri Tekno Kent Blok No:22 Yunusemre/MANİSA adresinde göstermektedir. Şirketimiz ilgili daha detaylı bilgi için www.vertexyazilim.com.tr adlı internet sitemizin İletişim bölümünü ziyaret edebilirsiniz.\n' +
        '\n' +
        'Yukarıdaki açıklamalar ışığında, kişisel verilerinizin işlenmesine ilişkin Aydınlatma Metni kapsamındaki açıklamalarımız aşağıdaki gibidir:\n' +
        '\t•\tVertex Yazılım Dijital Ürününü Satın Almanız ve Kullanmanız Sırasında Hangi Kişisel Verileriniz İşlenmektedir?\n' +
        'Kimlik bilgilerinizden; ad, soyad,\n' +
        'İletişim bilgilerinizden; telefon, şehir bilgisi, e-posta adresi\n' +
        'Müşteri işlem verilerinizden; çağrı kayıtları, şipariş bilgisi, ödeme şekli ve detayları, fatura, size yönelik oluşturulmuş Vertex Yazılım uzman/danışman notu, çalışma takviminiz,\n' +
        'İşlem güvenliği verilerinizden; IP adresi, Kullanıcı ID, cihaz bilgileri (kullanılan cihaza ilişkin marka, model, teknik özellik ve işletim sistemi bilgisi) kullanıcı adı ve şifre, hukuki metinleri onay kayıtları, Vertex Yazılım dijital ürününe giriş çıkış bilgileri, log kayıtlarınız, Vertex Yazılım test çözme ve ders izleme istatistiklerinizin bilgisi,\n' +
        'Finans Bilgilerinizden; banka hesap bilgileri, IBAN no\n' +
        '\n' +
        'Pazarlama; Program gezinme süre ve detaylarını içeren veriler, çerez kayıtları, anket cevaplarınız,\n' +
        'Mesleki deneyim- verilerinizden; mezuniyet durumu, üniversite, bölüm, branş bilgisi, diploma/karne puanı, okul türü bilgisi (ortaokul, lise türü ya da mezun bilgisi), okul adı bilgisi, dershane, etüt merkezi, kursa gidip gitmediğinizin, özel ders alıp almadığınızın bilgisi, hedeflenen okul/bölüm bilgisi, daha önce sınava girilip girilmediği bilgisi,\n' +
        'Diğer; program içi geri bildirim, puanlama, yorum ve görüş bilgileri, Ürün/Hizmet Kullanım Bilgisi, Talep/Şikayet Yönetimi Bilgisi, Instagram kullanıcı adı bilgisi\n' +
        '\t•\tVertex Yazılım Dijital Ürününü Satın Almanız ve Kullanmanız Sırasında Kişisel Verilerin İşlenme Amaçları, Veri İşlemenin Hukuki Sebebi ve Kişisel Verilerin Toplama Yöntemi\n' +
        '\n' +
        'İşlenen Kişisel Veriler\n' +
        'İşlenme Amaçları\n' +
        'Hukuki Sebepleri\n' +
        'Toplama Yöntemleri\n' +
        'Ad-soyad, e-posta, telefon, sipa bilgisi, Ödeme şekli ve detayları, IB numarası bilgisi, fatura\n' +
        'Satın almak istediğiniz dijital ürünün satış\n' +
        'işleminin\n' +
        'gerçekleştirilmesi ve mesafeli satış\n' +
        'sözleşmesinin gereğinin\n' +
        'yerine getirilmesi amacıyla, E-fatura/e-arşiv faturanın düzenlenerek tarafinıza gönderimini sağlamak\n' +
        'Vertex Yazılım  dijital ürününü satın almanız ve bizim bu bakımdan hizmetlerimizi yerine getirebilmemiz için\n' +
        'gerekli olması (KVKK m.5/2-c),\n' +
        'Uygulamanın\n' +
        'yürürlüğü, güvenliği ve denetimleriyle ilgili mevzuattan doğan hukuki\n' +
        'yükümlülüklerimizi yerine\n' +
        'getirebilmemiz için zorunlu olması (KVKK m.5/2-ç), bir hakkın tesisi, kullanılması veya korunması için bu\tverinin\n' +
        'işlenmesinin zorunlu olması (KVKK m.5/2- e) son olarak siz kullanıcılarımızın\n' +
        'temel hak ve özgürlüklerine zarar vermemek kaydıyla, meşru\n' +
        'menfaatlerimiz için zorunlu olması (KVKK m.5/2-f)\n' +
        'Vertex Yazılım web sitesini ziyaret etmeniz, Bilgi sistemleri ve elektronik cihazlar,\n' +
        'Sözleşme konusu hizmetin sunulması\n' +
        'esnasında çevrimiçi elektronik\n' +
        'formlar, diğer basılı formlar, e- posta, ilgili\n' +
        'tarafindan beyan edilen belgeler\n' +
        'vasıtasıyla\n' +
        '\n' +
        '\n' +
        'Ad-soyad, e-posta, telefon, log kayıtları, IP adresi, Kullanıcı ID, adres, ödeme şekli ve detayları, yetkililerle yapılan görüşmelere ilişkin ses kayıtları bilgisi (çağrı kayıtları), sipariş bilgisi,\n' +
        'fatura\n' +
        'Satış sonrası teknik destek hizmetinin verilebilmesi, Uygulama içi güvenliğin ve denetimin sağlanabilmesi, doğabilecek herhangi bir\n' +
        'anlaşmazlığın çözümü\n' +
        'Vertex Yazılım dijital ürününü satın almanız ve bizim bu bakımdan hizmetlerimizi yerine getirebilmemiz için\n' +
        'Vertex Yazılım web sitesini ziyaret etmeniz, Uzmanlarımıza Danışın canlı\n' +
        'destek hattı\n' +
        '\n' +
        '\n' +
        'aşamasında, ilgili kanun ve düzenlemelerine aykırı her türlü fiil, suç veya davranışa karşı sizin,\n' +
        'Vertex Yazılım\n' +
        'çalışanlarının ve diğer ilgili üçüncü\tkişilerin\n' +
        'güvenliğini\tsağlamak,\n' +
        'kanundan\tve\n' +
        'düzenlemelerinden kaynaklanan\n' +
        'yükümlülüklerimizi yerine getirmek ve yetkili ve görevli özel kamu kurum ve kuruluşlarına karşı her türlü dava, cevap ve itiraz hakkının kullanılması, uyuşmazlıklara ilişkin görüşme ve anlaşma süreçlerinin yürütülmesi, bizden bilgi talep etmeniz ve yasal hakların kapsamında başvuruda bulunmanız\thalinde gerekli bilgilerin tarafinıza ulaştırılabilmesi, sözleşme ve kanun ya da düzenlemelerine aykırı kullanımı engellemek, şüpheli işlemlerin ve hukuka\t\taykırı\n' +
        'kullanımların\ttespit edilebilmesi\n' +
        'gerekli olması (KVKK m.5/2-c),\n' +
        'Uygulamanın\n' +
        'yürürlüğü, güvenliği ve denetimleriyle ilgili mevzuattan doğan hukuki\n' +
        'yükümlülüklerimizi yerine\n' +
        'getirebilmemiz için zorunlu olması (KVKK m.5/2-ç), bir hakkın tesisi, kullanılması veya korunması için bu\tverinin\n' +
        'işlenmesinin zorunlu olması (KVKK m.5/2- e) son olarak siz kullanıcılarımızın\n' +
        'temel hak ve özgürlüklerine zarar vermemek kaydıyla, meşru\n' +
        'menfaatlerimiz için zorunlu olması (KVKK m.5/2-f)\n' +
        'üzerinden bizimle iletişime geçmeniz, Satın alma sonrasında teknik destek\n' +
        'talep etmeniz, Vertex Yazılım dijital\n' +
        'ürününde sorun bildirmeniz, Vertex Yazılım yetkililerini\n' +
        'aramanız ya da WhatsApp\n' +
        'aracılığıyla\n' +
        'yetkili kişilerle iletişim\n' +
        'kurmanız\n' +
        '\n' +
        'Bilgi sistemleri ve elektronik cihazlar,\n' +
        'Sözleşme konusu hizmetin sunulması\n' +
        'esnasında çevrimiçi elektronik\n' +
        'formlar, diğer basılı formlar, e-posta, ilgili tarafindan\n' +
        'beyan edilen belgeler\n' +
        'vasıtasıyla\n' +
        '\n' +
        '\n' +
        'IP Adresi, Kullanıcı ID, Log Kayıtları, program giriş çıkış bilgileri, kullanıcı adı ve şifre bilgileri\n' +
        'İşlem güvenliğinin sağlanması\n' +
        'Kişisel verileriniz, sayılan amaçların gerçekleştirilmesi doğrultusunda,\n' +
        'KVKK’nın 5’inci maddesinde\n' +
        'belirtilen;\n' +
        'Kanunlarda açıkça öngörülmesi,\n' +
        'İlgili kişinin temel hak ve özgürlüklerine\n' +
        'zarar vermemek\n' +
        'Bilgi sistemleri ve elektronik cihazlar\n' +
        'aracılığıyla toplanmaktadır.\n' +
        '\n' +
        '\n' +
        '\n' +
        'kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması\n' +
        '\n' +
        'Vertex Yazılım Dijital ürünü içerisinde “Sorun Bildir” bölümlerine bildirdiğiniz sorunlar ve yorumlarınız (program içi geri bildirim)\n' +
        'Sistem içerisindeki sorunların saptanması ve düzeltilebilmesi, Müşteri Memnuniyetine Yönelik Aktivitelerin Yürütülmesi,\n' +
        'Kişisel\tverileriniz,\n' +
        'sayılan\tamaçların gerçekleştirilmesi doğrultusunda, KVKK’ nın 5’inci\n' +
        'Vertex Yazılım web sitesini ziyaret etmeniz,\n' +
        'Bilgi sistemleri ve elektronik cihazlar aracılığıyla toplanmaktadır.\n' +
        '\n' +
        'Müşteri İlişkileri Yönetimi\n' +
        'maddesinde\n' +
        '\n' +
        '\n' +
        'Süreçlerinin Yürütülmesi,\n' +
        'belirtilen;\n' +
        '\n' +
        '\n' +
        'Talep / Şikayetlerin Takibi\n' +
        'İlgili kişi tarafindan\n' +
        '\n' +
        '\n' +
        '\n' +
        'alenileştirilmiş olması\n' +
        '\n' +
        '\n' +
        '\n' +
        'hukuki sebebine\n' +
        '\n' +
        '\n' +
        '\n' +
        'dayanarak\n' +
        '\n' +
        '\n' +
        '\n' +
        'işlenmektedir.\n' +
        '\n' +
        '\n' +
        '\n' +
        'Vertex Yazılım dijital ürünü içerisindeki anket cevaplarınız: branş bilgisi, diploma/karne puanı, okul türü bilgisi (ortaokul, lise türü ya da mezun bilgisi), okul adı bilgisi, dershane, etüt merkezi, kursa gidip gitmediğinizin, özel ders alıp almadığınızın bilgisi, hedeflenen okul/bölüm bilgisi, daha önce sınava girilip girilmediği bilgisi.\n' +
        'Anket çalışmalarının yapılması, anonimleştirilmiş istatistiki veri oluşturulabilmesi, kullanıcı deneyiminizi iyileştirmeye yönelik Vertex Yazılım çalışmaları ve operasyonel süreçlere ilişkin stratejik planlama, analiz ve iş geliştirme\n' +
        'çalışmalarının yapılması, Vertex Yazılım uzman/danışmanlarının sizleri bu bilgiler\n' +
        'aracılığıyla etkin bir\n' +
        'şekilde yönlendirebilmesi, kullanıcı memnuniyetine yönelik aktivitelerin yürütülmesi\n' +
        'Kişisel verileriniz, sayılan amaçların gerçekleştirilmesi doğrultusunda,\n' +
        'KVKK’nın 5’inci maddesinde\n' +
        'belirtilen;\n' +
        'İlgili kişinin temel hak ve özgürlüklerine\n' +
        'zarar\tvermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri\n' +
        'işlenmesinin zorunlu olması hukuki\n' +
        'sebebine dayanarak işlenmektedir.\n' +
        'Vertex Yazılım anketlerine katılmanız\tve görüş,\t öneri, puanlama bildirmeniz,\t\tBilgi sistemleri ve\n' +
        'elektronik cihazlar\n' +
        'aracılığıyla toplanmaktadır.\n' +
        '\n' +
        '\n' +
        'Ad, soyad, e-posta adresi, cep telefonu bilgileri, IP adresi, Kullanıcı ID, Vertex Yazılım web sitemizi ziyaret etmeniz sırasında elde edilen kullanım (gezinti) bilgileriniz, çerez bilgileri (reklam tanıtıcısı/kimliği bilgileri, yaşadığınız şehrin bilgisi\n' +
        'Size özel olanak ve teklifler sunulması, genel veya size özel kişiselleştirilmiş\n' +
        'kampanyalar, avantajlar, promosyonlar, reklamlar, deneme sınavları ve diğer etkinliklerin\n' +
        'düzenlenmesi, profilleme, raporlama, pazarlama ve analiz\t\tçalışmalarının yapılması, Uygulama, Site veya\tdiğer\t3.\t\tTaraf ortamlarında\tVertex Yazılım reklamlarının ve pazarlama,\t\t\tiletişim faaliyetlerinin (Uygulama içerisinde size özel ya da genel iletilen bildirimler, hedeflenmiş\n' +
        'reklam/tanıtımların yapılması ve etkin bir kullanıcı deneyimi\n' +
        'yaşamanızı sağlamak, kullanıcı ekranının\n' +
        'özelleştirilmesi, size özel sunduğumuz kampanyalar, anket) yapılması, kullanıcı deneyiminizi iyileştirmeye yönelik çalışmaları ve\n' +
        'operasyonel süreçlere ilişkin stratejik planlama, analiz ve iş geliştirme, Kullanımlara ilişkin\tistatistiksel çalışmaların yapılması.\n' +
        'Pazarlama,\n' +
        'segmentasyon ve analiz çalışmaları kapsamında kişisel veri\tişleme\n' +
        'süreçlerine ve ticari iletişim faaliyetlerine ilişkin\tolarak\n' +
        'vereceğiniz “açık rıza” (KVKK m.5/1) hukuki sebeplerine dayanarak\n' +
        'işlenmektedir.\n' +
        'Vertex Yazılım web sitesini ziyaret\n' +
        'etmeniz, Vertex Yazılım anketlerine katılmanız ve görüş, öneri, puanlama bildirmeniz, Bilgi sistemleri\tve elektronik\n' +
        'cihazlar\n' +
        'aracılığıyla toplanmaktadır.\n' +
        '\n' +
        '\n' +
        'Hukuki metinleri (Aydınlatma Metni, Açık\tRıza\tMetni,\tMesafeli\tSatış Sözleşmesi, Ön Bilgilendirme Formu) onay kayıtları bilgisi\n' +
        'Kanundan doğan ispat\n' +
        'yükümlülüklerimizin yerine getirilebilmesi\n' +
        'Kişisel verileriniz, sayılan amaçların gerçekleştirilmesi doğrultusunda,\n' +
        'KVKK’nın 5’inci maddesinde\n' +
        'belirtilen;\n' +
        'Uygulamanın\n' +
        'yürürlüğü, güvenliği ve denetimleriyle ilgili mevzuattan doğan hukuki\n' +
        'yükümlülüklerimizi yerine getirebilmemiz için zorunlu olması\n' +
        '(KVKK m.5/2-ç),\n' +
        'Bir hakkın tesisi, kullanılması veya korunması için bu verinin işlenmesinin\n' +
        'zorunlu olması (KVKK m.5/2-e) hukuki\n' +
        'sebeplerine dayanarak\n' +
        'işlenmektedir.\n' +
        'Bilgi sistemleri ve elektronik cihazlar\n' +
        'aracılığıyla toplanmaktadır.\n' +
        '\n' +
        '\n' +
        'Her türlü kanaldan yapmış olduğunuz öneri, görüş, puanlamalarınıza ilişkin bilgiler, Çözücü, Koçum Yanımda, Şimdi Anladım Uygulamalarında yapılan anketlere verdiğiniz yanıtlar, görüş, öneri, puanlamalarınız,\n' +
        'Hizmetlerin\tiyileştirilmesi, geliştirilmesi amacıyla istatistiki veri oluşturulabilmesi,\n' +
        'kullanıcı deneyiminizi iyileştirmeye yönelik Vertex Yazılım çalışmaları\n' +
        'Kişisel verileriniz, sayılan amaçların gerçekleştirilmesi doğrultusunda,\n' +
        'KVKK’nın 5’inci maddesinde\n' +
        'belirtilen;\n' +
        'Siz kullanıcılarımızın temel hak ve özgürlüklerine zarar vermemek kaydıyla, meşru\n' +
        'menfaatlerimiz için zorunlu olması (KVKK m.5/2-f),\n' +
        'Vertex Yazılım web sitesini ziyaret\n' +
        'etmeniz, Vertex Yazılım anketlerine katılmanız ve görüş, öneri, puanlama bildirmeniz, Bilgi sistemleri\tve elektronik\n' +
        'cihazlar\n' +
        'aracılığıyla toplanmaktadır.\n' +
        '\n' +
        '\n' +
        'Siz\n' +
        '\n' +
        '\n' +
        '\n' +
        'kullanıcılarımızın\n' +
        '\n' +
        '\n' +
        '\n' +
        'temel\thak\tve\n' +
        '\n' +
        '\n' +
        '\n' +
        'özgürlüklerine zarar\n' +
        '\n' +
        '\n' +
        '\n' +
        'vermemek kaydıyla,\n' +
        '\n' +
        '\n' +
        '\n' +
        'meşru\n' +
        'menfaatlerimiz için zorunlu olması (KVKK m.5/2-f) hukuki\n' +
        'sebeplerine dayanarak\n' +
        'işlenmektedir.\n' +
        '\n' +
        '\n' +
        '\n' +
        'Size yönelik oluşturulmuş Vertex Yazılım uzman/danışman notu, çalışma takviminiz, test çözme ve ders izleme istatistiklerinizin bilgisi\n' +
        'Hizmetlerin iyileştirilmesi, geliştirilmesi,\n' +
        'Kişiselleştirilmiş bir kullanıcı\n' +
        'deneyimi hizmeti sunmak\n' +
        'Kişisel verileriniz, sayılan amaçların gerçekleştirilmesi doğrultusunda,\n' +
        'KVKK’nın\t5’inci maddesinde\n' +
        'belirtilen;\n' +
        'Vertex Yazılım dijital ürünü satın almanız ve bu bakımdan hizmetlerimizi yerine getirebilmemiz için gerekli olması (KVKK m.5/2-c),\n' +
        'Siz kullanıcılarımızın temel hak ve\n' +
        'özgürlüklerine zarar vermemek kaydıyla, meşru\n' +
        'menfaatlerimiz için zorunlu olması (KVKK m.5/2-f) hukuki\n' +
        'sebeplerine dayanarak\n' +
        'işlenmektedir.\n' +
        'Bilgi sistemleri ve elektronik cihazlar\n' +
        'aracılığıyla toplanmaktadır.\n' +
        '\n' +
        '\n' +
        '\n' +
        '\t•\tKişisel verilerinizi kimlere ve hangi amaçlarla aktarmaktayız?\n' +
        'Kişisel verileriniz KVKK Md.28/1 çerçevesinde talep edilmesi halinde aydınlatma yükümlülüğü olmadan ve açık rızanız aranmadan ilgili makamlara aktarılabilir. Bunun dışında öngörülemeyen durumlarda da kişisel verileriniz kanunlarda açıkça belirtilmiş durumlarda talep edilmesi halinde kanunlarda belirtilen kamu kurumlarına (Bakanlıklar gibi idari makamlara) kanunda öngörülen amaç ve sınırlamalar dahilinde aktarılabilir.\n' +
        'Aydınlatma yükümlülüğü olmayan ve açık rızanızı gerektirmeyen yasal yükümlülüklerimizin dışında; kanun m.8’de belirtilen şartlar çerçevesinde;\n' +
        '\t•\tHizmetlerin yerine getirilmesi ve hizmetlerin iyileştirilmesi amaçlarıyla Vertex Yazılım ortaklarına, çözüm ortaklarına,\n' +
        '\t•\tGelişim Bilgilendirme Sisteminin kullanılması halinde velilere,\n' +
        '\t•\tYetkili ve görevli özel veya kamu kurum ve kuruluşlar (Vergi daireleri, Aile ve Sosyal Politikalar Bakanlığı gibi) ile adli makamlara ve resmi kurum/kuruluşlara karşı olan bilgi, belge verme, faaliyetlerimizin mevzuata uygun yürütülmesi ve ilgili sair yükümlülüklerimizi yerine getirmek ve dava ve cevap hakları gibi yasal haklarımızı kullanabilmek amacıyla bizden istenen bilgileri anılan bu kurum, kuruluş ve makamlara,\n' +
        '\n' +
        '\t•\tFaaliyetlerin mevzuata uygun yürütülmesi, sözleşme ve muhasebe süreçlerinin yürütülmesi amaçlarıyla anlaşmalı olunan mali müşavirlik ve hukuk bürolarına,\n' +
        '\t•\tRıza göstermeniz halinde, Vertex Yazılım’ın hizmet faaliyetlerinin yerine getirilmesi amacı ile verilen hizmetler ve yukarıda belirtilen amaçlar kapsamında, bilişim teknolojileri, pazarlama/reklam/analiz faaliyetleri ya da uzmanlık gerektiren danışmanlık vb. hizmetlerini almak amaçlarıyla yurtiçi ve yurtdışında bulunan iş ortaklarına, tedarikçilere ve hizmet sağlayıcılara (elektronik ileti aracı hizmet sağlayıcıları, çağrı merkezi, cihazlar aracılığıyla kişisel veri toplayanlar, pazarlama/reklam/analiz hizmeti sağlayıcıları, veri tabanı ve sunucu hizmeti sağlayıcıları, altyapı bakım ve destek ve yazılım lisanslama hizmeti sağlayıcıları, e-fatura/e- arşiv fatura hizmeti sağlayıcıları, bağımsız denetim hizmeti sağlayıcıları, arşivleme ve cloud hizmeti verenler gibi) aktarmaktayız.\n' +
        '\t•\tKişisel verilerinize ilişkin olarak haklarınız nelerdir?\n' +
        'Kişisel Verilerin Korunması Kanunu’nun 11. maddesi gereğince aşağıda sunulan haklara sahip olduğunuzu hatırlatmak isteriz:\n' +
        '\t•\tKişisel verilerinizin işlenip işlenmediğini öğrenme,\n' +
        '\t•\tKişisel verileriniz işlenmişse buna ilişkin bizden bilgi talep etme,\n' +
        '\t•\tKişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,\n' +
        '\t•\tYurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme,\n' +
        '\t•\tKişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,\n' +
        '\t•\tKVK Kanunu ve ilgili diğer kanun hükümlerine uygun olarak işlenmiş olmasına rağmen, işlenmesini gerektiren sebeplerin ortadan kalkması hâlinde kişisel verilerinizin silinmesini veya yok edilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,\n' +
        '\t•\tİşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,\n' +
        '\t•\tKişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.\n' +
        '\n' +
        'Vertex Yazılım, Kanun’a uygun olarak, idari ve teknik imkanlar dahilinde; siz kullanıcılarımızın kişisel verilerini kullanmalarını mümkün kılınması için gerekli olan sistemleri yürütmektedir.\n' +
        'Haklarınıza ilişkin taleplerinizi, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ’e uygun şekilde yazılı olarak ya da kayıtlı elektronik posta (KEP) adresi, güvenli elektronik imza, mobil imza ya da bize daha önce bildirdiğiniz ve sistemimizde kayıtlı olan elektronik posta adresini kullanarak aşağıda belirtmiş olduğumuz adreslere her zaman iletebilirsiniz. Başvurunuzu dilerseniz, VERTEX YAZILIM ELEKTRONİK BİLİŞİM İTHALAT İHRACAT SANAYİ VE TİCARET A.Ş.  “Veri Sahibi Başvuru Formu’nda” yer alan yöntemlerle Şirketimize iletebilirsiniz. Talebiniz, niteliğine göre en kısa sürede ve en geç otuz gün içinde ücretsiz olarak sonuçlandıracaktır. Ancak, işlemin ayrıca bir maliyeti gerektirmesi hâlinde, Kişisel Verileri Koruma Kurulu tarafindan belirlenen tarifedeki ücret tarafindan tahsil edilebilir.\n' +
        'Veri Sorumlusu: VERTEX YAZILIM ELEKTRONİK BİLİŞİM İTHALAT İHRACAT SANAYİ VE TİCARET A.Ş.\n' +
        'e-posta: \n' +
        'KEP adresi: \n' +
        '\n' +
        'Adres: Muradiye Mah. Celal Bayar Üniversitesi Kampüsü Küme Evleri Tekno Kent Blok No:22 Yunusemre/MANİSA\n' +
        '\n' +
        'Kişisel verilerinizin işleme faaliyetleriyle ilgili gerekli açıklamalar bu Aydınlatma Metninde yer almaktadır. Yine de bu konuya ilişkin daha detaylı bilgi talep etmeniz halinde, www.vertexyazilim.com.tr internet sitemizde yer alan Kişisel Verilerin İşlenmesi ve Korunması Politikamızı inceleyebilir ya da bizleri arayabilirsiniz.\n' +
        '\n',
    },
    {
      title: 'BİLGİ GÜVENLİĞİ POLİTİKASI',
      content:
        'Vertex Yazılım olarak sahip olduğumuz bilginin kıymetli ve değerli olduğunu biliyor ve bu bilginin korunması için TS ISO/IEC 27001 Bilgi Güvenliği Yönetim Standardının gereklilikleri göz önünde bulundurarak gerekli önlemleri alıyoruz. Bu kapsamda bilgi güvenliği politikamız;\n\n' +
        'Bilgi Güvenliği Standartlarının gerekliliklerini yerine getirmek,\n' +
        'Bilgi Güvenliği ile ilgili tüm yasal mevzuata uyum sağlamaya çalışmak,\n' +
        'Bilgi varlıklarına yönelik riskleri tespit etmek ve sistematik bir şekilde riskleri yönetmek,\n' +
        'Bilgi Güvenliği Yönetim Sistemini sürekli gözden geçirmek ve iyileştirmek,\n' +
        'Bilgi Güvenliğini tehlikeye atacak herhangi bir olayın oluşmasını engelleyecek önlemleri almak,\n' +
        'Bilgi Güvenliğine yönelik herhangi bir olay olduğunda gerekli çalışmaları yaparak tehlikeyi bertaraf etmek,\n' +
        'Bilgi güvenliği seviyesini en üst düzeyde tutarak şirketimizin güvenilirliğini ve marka imajını korumak,\n' +
        'Bilgi Güvenliği farkındalığını artırmak için, teknik ve davranışsal yetkinlikleri geliştirecek şekilde eğitimler gerçekleştirmek,\n' +
        'Bilgi Güvenliği farkındalığını arttırmak ve bilgiyi korumanın çerçevesini belirlemek için çalışan politikaları oluşturmak ve çalışanlarımızın bu politikalara uymasını sağlamak,\n' +
        'İş/Hizmet sürekliliğine bilgi güvenliği tehditlerinin etkisini azaltmak ve işin sürekliliği ve sürdürülebilirliğini sağlamak\n' +
        'Kurulan kontrol altyapısı ile bilgi güvenliği seviyesini korumak ve iyileştirmektir.',
    },
    {
      title: 'KİŞİSEL VERİLERİN İŞLENMESİ VE KORUNMASI POLİTİKASI',
      content:
        '\n' +
        'KİŞİSEL VERİLERİN İŞLENMESİ VE KORUNMASI POLİTİKASI \n' +
        '1. AMAÇ \n' +
        'Tanımı aşağıda (“2-Tanımlar” Başlığı Altında) verilecek olan “kişisel veri” temel insan hakkı olarak Avrupa Birliği Temel Haklar Bildirgesi’nin 8. ve Avrupa Birliği’nin İşleyişi Hakkında Antlaşma’nın 16. maddelerinde yerini almıştır. Ayrıca kişisel veri Türkiye Cumhuriyeti Anayasa’sının “Özel Hayatın Gizliliği” başlıklı 20. maddesinde de düzenleme altına alınarak, temel haklar arasına dahil edilmiştir. Bu önemi sebebiyle, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) gerçek kişilere ait kişisel verilerin işlenmesinde başta özel hayatın gizliliği olmak üzere kişilerin temel hak ve özgürlüklerini korumak ve kişisel verileri işleyen gerçek ve tüzel kişilerin yükümlülükleri ile uyacakları usul ve esasları düzenlemek maksadıyla 7 Nisan 2016 tarihli Resmi Gazete’ de yayınlanmak suretiyle ihdas edilmiş ve yürürlüğe girmiştir.  Muradiye Mah. Celal Bayar Ünv. Kampüsü Küme Evler Teknokent No:22 Yunusemre /MANİSA adresinde mukim Vertex Yazılım Elektronik Bilişim İthalat İhracat Sanayi ve Ticaret A.Ş.  (“Şirket”) olarak temel insan haklarına atfettiğimiz önem ve kişisel verilerin üstün kıymeti göz önüne alınarak KVKK’ nın öngörmüş olduğu yükümlülük dâhilinde işbu Kişisel Verilerin İşlenmesi ve Korunması Politikası’nı (“Politika”) 6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında sizlerin bilgisine sunmaktayız. KVKK uyarınca, Veri Sorumlusu sıfatıyla, Şirket, çalışanlarını, çalışan adaylarını, OSINIF  kullanıcılarını, www.osinif.com internet sitesinde gezinen ziyaretçileri ve kişisel verisi işlenen 3. kişileri aşağıdaki şekilde bilgilendirmekte ve KVKK’ nın 10. maddesinde belirtilen kapsamda aşağıdaki şekilde aydınlatmaktayız.\n' +
        '\n' +
        ' 2. POLİTİKANIN KAPSAMI VE KİŞİSEL VERİ SAHİPLERİ \n' +
        'Bu Politika; otomatik olan ya da herhangi bir veri kayıt sisteminin parçası olmak kaydıyla otomatik olmayan yollarla, Çalışan, Çalışan Adayı, Alıcı, Kullanıcı, Ziyaretçi, Gerçek Kişi İş Ortağı, Yetkilisi ve Çalışanı, Uzmanlar, Danışmanlar, Üçüncü Kişiler başta olmak üzere kişisel verileri Şirketimiz tarafından işlenen kişiler için hazırlanmıştır ve bu belirtilen kişiler kapsamında uygulanacaktır. Şirketimiz bu Politikayı internet sitesinde yayımlamak suretiyle bahse konu kişisel veri sahiplerini Kanun hakkında bilgilendirmektedir. Bu kapsamda işbu Politika kapsamındaki kişisel veri sahipleri aşağıdaki gibidir: Çalışan Şirket bünyesinde çalışan gerçek kişilerdir. Çalışan Adayı Şirkete herhangi bir yolla iş başvurusunda bulunmuş ya da özgeçmiş ve ilgili bilgilerini Şirket’in incelemesine açmış olan gerçek kişilerdir. Alıcı OSINIF dijital ürünlerini satın alan kişilerdir. Kullanıcı OSINIF dijital ürünlerini kullananlardır. Ziyaretçi Şirket’in sahip olduğu fiziksel yerleşkelere çeşitli amaçlarla giren veya internet sitelerini herhangi bir amaç ile ziyaret eden tüm gerçek kişilerdir. Gerçek Kişi İş Ortağı, Yetkilisi, Çalışanı Şirketin her türlü iş ilişkisinde bulunduğu gerçek kişiler, tüzel kişi ise yetkilileri ve bunların çalışanlarıdır. Uzman, Danışman OSINIF dijital ürünlerinin hazırlanmasında, işbirlikçi olarak fayda sağlayan tüm uzman ve danışmanlardır. Rehberlik Danışanları OSINIF rehberlik servisinde, kullanıcılara destek sağlayan alanında yetkin ve yetkili kişilerdir. Üçüncü Kişi İşbu Kişisel Verilerin Korunması ve İşlenmesi Politikası kapsamına ve bu Politikada herhangi bir kişisel veri sahibi kategorisine girmeyen diğer gerçek kişilerdir. \n' +
        '\n' +
        '3. TANIMLAR\n' +
        ' İşbu Politikada yer verilen kavramlar aşağıda belirtilen anlamları ifade eder: .Şirket/Şirketimiz Muradiye Mah. Celal Bayar Ünv. Kampüsü Küme Evler Teknokent No:22 Yunusemre /MANİSA adresinde mukim Vertex Yazılım Elektronik Bilişim İthalat İhracat Sanayi ve Ticaret  A.Ş.’yi ifade eder. \n' +
        '.Veri Sahibi/İlgili Kişi Kişisel verisi işlenen gerçek kişi. \n' +
        '.Veri Sorumlusu Kişisel verilerin işleme amaçlarını ve vasıtalarını belirleyen, veri kayıt sisteminin kurulmasından ve yönetilmesinden sorumlu olan gerçek veya tüzel kişi. \n' +
        '.Kişisel Veri/Veriler Kimliği belirli veya belirlenebilir gerçek kişiye ilişkin her türlü bilgidir.\n' +
        '. Özel Nitelikli Kişisel Veri/Veriler Irk, etnik köken, siyasi düşünce, felsefi inanç, din, mezhep veya diğer inançlar, kılık kıyafet, dernek vakıf ya da sendika üyeliği, sağlık, cinsel hayat, ceza mahkûmiyeti ve güvenlik tedbirleriyle ilgili veriler ile biyometrik ve genetik verilerdir. \n' +
        '.Kişisel Verilerin İşlenmesi Kişisel verilerin tamamen veya kısmen otomatik olan ya da herhangi bir veri kayıt sisteminin parçası olmak kaydıyla otomatik olmayan yollarla elde edilmesi, kaydedilmesi, depolanması, muhafaza edilmesi, değiştirilmesi, yeniden düzenlenmesi, açıklanması, aktarılması, devralınması, elde edilebilir hâle getirilmesi, sınıflandırılması ya da kullanılmasının engellenmesi gibi veriler üzerinde gerçekleştirilen her türlü işlem. \n' +
        '.Kurul Kişisel Verileri Koruma Kurulu.\n' +
        '.Kanun/KVKK 7 Nisan 2016 tarihli ve 29677 sayılı Resmi Gazete ’de yayımlanan, 24 Mart 2016 tarihli ve 6698 sayılı Kişisel Verilerin Korunması Kanunu. \n' +
        '.Politika Şirket tarafından oluşturulan kişisel veri işlenmesi ve koruma politikası. \n' +
        '.Veri İşleyen Veri sorumlusunun verdiği yetkiye dayanarak onun adına kişisel verileri işleyen gerçek veya tüzel kişi\n' +
        '. Veri Kayıt Sistemi Kişisel verilerin belirli kriterlere göre yapılandırılarak işlendiği kayıt sistemi. .İlgili Kullanıcı Verilerin teknik olarak depolanması, korunması ve yedeklenmesinden sorumlu olan kişi ya da birim hariç olmak üzere veri sorumlusu organizasyonu içerisinde veya veri sorumlusundan aldığı yetki ve talimat doğrultusunda kişisel verileri işleyen kişilerdir.\n' +
        '. Çerez (Cookie) Kullanıcıların bilgisayarlarına yahut mobil cihazlarına kaydedilen ve ziyaret ettikleri web sayfalarındaki tercihleri ve diğer bilgileri depolamaya yardımcı olan küçük dosyalardır.\n' +
        '. Açık Rıza Belirli bir konuya ilişkin, bilgilendirilmeye dayanan ve özgür iradeyle açıklanan rızayı ifade eder. \n' +
        '.İmha Kişisel verilerin silinmesi, yok edilmesi veya anonim hale getirilmesi. \n' +
        '.İrtibat Kişisi Veri sorumlusu Şirketimizin Kanun ve bu Kanuna dayalı olarak çıkarılacak ikincil düzenlemeler kapsamındaki yükümlülükleriyle ilgili olarak, Kurum ile kurulacak iletişim için veri sorumlusu tarafından Sicile kayıt esnasında bildirilen gerçek kişi. (İrtibat kişisi Veri Sorumlusunu temsile yetkili değildir. Adından anlaşılacağı üzere yalnızca veri sorumlusu ile ilgili kişilerin ve Kurumun iletişimini “irtibatı” sağlamak üzere görevlendirilen kişidir.) \n' +
        '.Kayıt Ortamı Tamamen veya kısmen otomatik olan ya da herhangi bir veri kayıt sisteminin parçası olmak kaydıyla otomatik olmayan yollarla işlenen kişisel verilerin bulunduğu her türlü ortam\n' +
        ' 4. KİŞİSEL VERİLERİN İŞLENMESİNDE GENEL İLKELER \n' +
        'Şirket tarafından Kişisel Veriler, Kanunda ve bu Politikada öngörülen usul ve esaslara uygun olarak işlenir. Şirket, Kişisel Verileri işlerken aşağıdaki ilkelerle hareket eder: \n' +
        '• Kişisel Veriler, ilgili hukuk kurallarına ve dürüstlük kuralının gereklerine uygun olarak işlenir.\n' +
        ' • Kişisel Verilerin doğru ve güncel olması sağlanır. Bu kapsamda verilerin elde edildiği kaynakların belirli olması, doğruluğunun teyit edilmesi, güncellenmesi gerekip gerekmediğinin değerlendirilmesi gibi hususlar özenle dikkate alınır. \n' +
        '• Kişisel Veriler; belirli, açık ve meşru amaçlarla işlenir. Amacın meşru olması, Şirketin işlediği Kişisel Verilerin, yapmış olduğu iş veya sunmuş olduğu hizmetle bağlantılı ve bunlar için gerekli olması anlamına gelir. \n' +
        '• Kişisel Veriler, Şirket tarafından belirlenen amaçların gerçekleştirilebilmesi için amaçla bağlantılı olup, amacın gerçekleştirilmesiyle ilgili olmayan veya ihtiyaç duyulmayan kişisel verilerin işlenmesinden kaçınılır. İşlenen veriyi, sadece amacın gerçekleştirilmesi için gerekli olanla sınırlı tutar. Bu kapsamda işlenen kişisel veriler, işlendikleri amaçla bağlantılı, sınırlı ve ölçülüdür. \n' +
        '• İlgili mevzuatta verilerin saklanması için öngörülen bir süre bulunması halinde bu sürelere uyum gösterir; aksi durumda kişisel verileri, ancak işlendikleri amaç için gerekli olan süre kadar muhafaza kişisel verinin daha fazla muhafaza edilmesi için geçerli bir sebep kalmaması durumunda, söz konusu veri silinir, yok edilir veya anonim hale getirilir. \n' +
        '\n' +
        '5. KİŞİSEL VERİLERİN İŞLENME ŞARTLARI \n' +
        'Kişisel veriler, kanunun 5. Maddesi uyarınca Veri Sahibi’ nin açık rızası olmaksızın işlenemez. Ancak yine aynı maddede yer alan düzenleme gereği; aşağıda yer alan şartlardan birinin varlığı halinde Veri Sahibinin açık rızası aranmaksızın kişisel veriler işlenecektir. -Kanunlarda Açıkça Öngörülmesi Veri sahibinin kişisel verileri, kanunda açıkça öngörülmekte ise diğer bir ifade ile ilgili kanunda kişisel verilerin işlenmesine ilişkin açıkça bir hüküm olması halinde işbu veri işleme şartının varlığından söz edilebilecektir. Örn: İş Kanunu veya İş Sağlığı ve Sosyal Güvenlik Kanunu hükümleri gereğince çalışanın özlük dosyasının tutulması. -Fiili İmkânsızlık Nedeniyle İlgilinin Açık Rızasının Alınamaması Fiili imkânsızlık nedeniyle rızasını açıklayamayacak durumda olan veya rızasına geçerlilik tanınmayacak olan kişinin kendisinin ya da başka bir kişinin hayatı veya beden bütünlüğünü korumak amacıyla kişisel verinin işlenmesinin zorunlu olması halinde veri sahibinin kişisel verileri işlenebilecektir. -Bir Sözleşmenin Kurulması veya İfasıyla Doğrudan Doğruya İlgili Olması Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla, sözleşmenin taraflarına ait kişisel verilerin işlenmesinin gerekli olması halinde kişisel veriler veri öznelerinin açık rızaları olmadan şirket tarafından işlenebilir. Örn: OSINIF internet sitesinden dijital ürünü satın alan kişiye ait iletişim ve adres bilgilerinin kurulan mesafeli satış sözleşmenin ifası gereği işlenmesi ya da yine bu sözleşme gereği ürün bedelinin ödenmesi için alıcı kart bilgilerinin alınması. -Şirketin (Veri Sorumlusu) Hukuki Yükümlülüğünü Yerine Getirmesi İçin Zorunlu Olması Şirketimizin hukuki yükümlülüklerini yerine getirmesi için işlemenin zorunlu olduğu durumlarda veri sahibinin kişisel verileri işlenebilecektir. Örn: çalışana maaş ödenebilmesi için, çalışanın banka ve hesap bilgilerinin alınması, evli olup olmadığının, bakmakla yükümlü olduğu kişilerin, eşinin çalışıp çalışmadığının ve sosyal sigorta bilgilerinin sorulması -Kişisel Verinin Veri Sahibinin Kendisi Tarafından Alenileştirilmiş Olması Veri sahibinin, kişisel verisini alenileştirmesi durumunda, alenileştirme amacı ile sınırlı olmak kaydıyla kişisel veri şirketimizce işlenebilecektir. -Bir Hakkın Tesisi veya Korunması için Veri İşlemenin Zorunlu Olması Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması halinde veri sahibinin kişisel verileri işlenebilecektir. Örn: çalışan tarafından açılan bir davada ispat için bazı verileri kullanması -Veri Sahibinin Temel Hak ve Özgürlüklerine Zarar Vermemek Kaydıyla Şirketimizin Meşru Menfaatleri için Veri İşlenmesinin Zorunlu Olması Kişisel veri sahibinin temel hak ve özgürlüklerine zarar vermemek kaydıyla Şirketimizin meşru menfaatleri için veri işlemesinin zorunlu olması halinde veri sahibinin kişisel verileri işlenebilecektir. Örn: çalışanların temel hak ve özgürlüklerine zarar vermemek kaydıyla, onların terfileri, maaş zamları veya sosyal haklarının düzenlenmesinde ya da işletmenin yeniden yapılandırılması sürecinde görev ve rol dağıtımında esas alınmak üzere çalışanların kişisel verilerinin işlenmesi.\n' +
        '\n' +
        ' 6. ÖZEL NİTELİKTE KİŞİSEL VERİLERİN İŞLENMESİ \n' +
        'Kişilerin ırkı, etnik kökeni, siyasi düşüncesi, felsefi inancı, dini, mezhebi veya diğer inançları, kılık ve kıyafeti, dernek, vakıf ya da sendika üyeliği, sağlığı, cinsel hayatı, ceza mahkûmiyeti ve güvenlik tedbirleriyle ilgili verileri ile biyometrik ve genetik verileri özel nitelikli kişisel veridir. Kanun’un 6. Maddesi uyarınca özel nitelikli kişisel veriler, veri sahibinin açık rızası alınmadan işlenemez. Ancak kişilerin cinsel hayatı ve sağlığı dışındaki özel nitelikli kişisel veriler kanunlarda öngörülen durumlarda veri sahibinin açık rızası alınmaksızın işlenebilecektir. Sağlık ve cinsel hayata ilişkin kişisel veriler ise ancak kamu sağlığının korunması, koruyucu hekimlik, tıbbi teşhis, tedavi ve bakım hizmetlerinin yürütülmesi, sağlık hizmetleri ile finansmanın planlanması ve yönetimi amacıyla, sır saklama yükümlülüğü altında bulunan kişiler veya yetkili kurum veya kuruluşlar tarafından ilgilinin açık rızası aranmaksızın işlenebilir. Bütün durumlarda, özel nitelikli kişisel verilerin işlenmesinde ayrıca kurul (Kişisel Verileri Koruma Kurulu) tarafından belirlenen yeterli önlemlerin alınması şarttır.\n' +
        '\n' +
        ' 7. KİŞİSEL VERİ SAHİPLERİNİN AYDINLATILMASI \n' +
        'Şirketimiz, Kanun’un 10. Maddesine uygun olarak, Kişisel Veri işlenmesinden önce veri sahiplerini aydınlatır. Bu kapsamda Şirketimiz, kişisel verilerin elde edilmesi sırasında Aydınlatma Yükümlülüğü’ nü yerine getirir. Aydınlatma yükümlülüğü kapsamında ise Veri Sahiplerine yapılacak bildirim şu unsurları içerir. \n' +
        '• Veri Sorumlusunun ve varsa temsilcisinin kimliği \n' +
        '• Kişisel verilerin hangi amaçla işleneceği \n' +
        '• İşlenen kişisel verilerin kimlere ve hangi amaçla aktarılabileceği \n' +
        '• Kişisel veri toplamanın yöntemi ve hukuki sebebi\n' +
        ' • Veri sahiplerinin KVKK Madde 11’de sayılan hakları Şirketimiz, Anayasa’nın 20. Ve KVKK’ nın 11. Maddesine uygun bir şekilde veri sahibinin bilgi talep etmesi halinde gerekli bilgilendirmeyi yapar.\n' +
        '\n' +
        ' 8. KİŞİSEL VERİLERİN AKTARILMASI \n' +
        ' Kişisel Verilerin Yurt içinde Aktarılması Kanun’un 8. maddesi uyarınca Kişisel Veriler kural olarak, Veri Sahibinin açık rızası olmaksızın üçüncü kişilere aktarılamaz. Ancak işbu Politika’ nın 4. maddesinde sayılan, Veri Sahibinin açık rızası aranmayacak hallerden birinin mevcut olması halinde Kişisel Verilerin, Veri Sahibinin açık rızası olmaksızın yurt içinde üçüncü kişilere aktarımı mümkündür. Özel Nitelikli Kişisel Veriler bakımından ise yeterli önlemler alınmak kaydıyla Kanun’un 6. Maddesinin 3. Fıkrasında belirtilen şartlardan birinin mevcudiyeti halinde veri sahibinin açık rızası aranmaksızın veri aktarımı yapılması mümkündür. -Kişisel Verilerin Yurt Dışına Aktarılması Kanun’un 9. maddesi uyarınca Kişisel Veriler kural olarak, Veri Sahibinin açık rızası olmaksızın yurt dışına aktarılamaz. Ancak aşağıda belirtilen hallerden birinin mevcut olması durumunda Kişisel Verilerin, Veri Sahibinin açık rızası aranmaksızın yurt dışında üçüncü kişilere aktarımı mümkündür: \n' +
        '• Bu Politika’ nın 4. ve 5. maddelerinde belirtilen, Veri Sahibi’ nin rızasının aranmayacağının belirtildiği hallerden birinin mevcut olması \n' +
        '• Kişisel Verilerin aktarılacağı yabancı ülkede yeterli korumanın bulunması \n' +
        '• Yeterli korumanın bulunmaması durumunda Türkiye’deki ve ilgili yabancı ülkedeki veri sorumlularının yeterli bir korumayı yazılı olarak taahhüt etmeleri ve Kurulun izninin bulunması Yeterli korumanın bulunduğu ülkeler Kurulca belirlenerek ilan edilir. Kişisel Veriler, uluslararası sözleşme hükümleri saklı kalmak üzere, Türkiye’nin veya Veri Sahibinin menfaatinin ciddi bir şekilde zarar göreceği durumlarda, ancak ilgili kamu kurum veya kuruluşunun görüşü alınarak Kurulun izniyle yurt dışına aktarılabilir. - Kişisel Verilerin Aktarılabileceği Üçüncü Kişiler Şirketimiz, Kişisel Verileri bu Politika’ da belirtilen amaçlarını gerçekleştirmek için, Kanun’un 8. ve 9. maddelerine uygun olarak, yurt içinde veya yurtdışındaki, gerçek veya tüzel kişi olabilecek, aşağıda belirtilen üçüncü kişilere aktarabilmektedir: \n' +
        '• Danışmanlar \n' +
        '• Denetim Firmaları \n' +
        '• Hizmet Alınan Firmalar \n' +
        '• İş birliği Yapılan Firmalar \n' +
        '• Müşteriler\n' +
        ' • Pay Sahipleri \n' +
        '• Bankalar ve Finans Kuruluşları \n' +
        '• Yargısal Merciler ve Kamu Otoriteleri \n' +
        '\n' +
        '9. KİŞİSEL VERİLERİNİZİN İŞLENME AMAÇLARI, İŞLEDİĞİMİZ KİŞİSEL VERİLERİNİZ, TOPLAMA YÖNTEMLERİ VE HUKUKİ SEBEPLERİ \n' +
        '- İşlenme Amaçları Kişisel verileriniz KVKK’ da öngörülen sınırlara riayet edilerek Şirket mevzuatında gösterilen amaçları gerçekleştirmek için kullanılacaktır. İşleme amaçlar şunlardır; 1. Bilgi güvenliği süreçlerinin yürütülmesi, \n' +
        '2. Çalışan adayı/ stajyer seçme ve yerleştirme süreçlerinin yürütülmesi ve İnsan kaynakları politikalarının en iyi şekilde planlanması ve uygulanması, \n' +
        '3. Şirketimiz tarafından sunulan hizmetlerden yararlanmanız için gereken çalışmaların ilgili birimlerce yapılması, \n' +
        '4. www.osinif.com internet sitesi Canlı Destek ile ya da diğer iletişim yollarıyla tarafımızla iletişime geçmeniz halinde, sizlere satın alma desteği ya da teknik destek sağlayabilmek, \n' +
        '5. Şirketin ihtiyaç duyduğu alanlarda personel temini, 4857 sayılı İş Kanunu, 6331 sayılı İş Sağlığı ve Güvenliği Kanunu ve 5510 sayılı Sosyal Sigortalar ve Genel Sağlık Sigortası Kanunu başta gelmek üzere iş hayatını düzenleyen mevzuat kapsamında hak ve yükümlülüklerin yerine getirilmesi,\n' +
        ' 6. Personele ilişkin maaş ödeme, avans, prim, ikramiye vb. ödeme faaliyetlerinin yürütülmesi, Şirket içi yazışmaların yapılması, \n' +
        '7. Şirket hukuk işlerinin icrası/takibi, Yetkili kamu kurum ve kuruluşları ile adli ve yargı makamlarına kanunlarda gösterilen haller dahilinde bilgi-belge temini,\n' +
        ' 8. Finansal raporlama ve risk yönetimi işlemlerinin icrası/takibi, \n' +
        '9. İş ortakları veya tedarikçilerle olan ilişkilerin yönetimi, \n' +
        '10. Şirketteki organizasyon ve etkinlik (seminer, konferans, toplantı, eğitim, sempozyum vb.) yönetimi süreçlerinin işlerliğinin sağlanarak kamuoyuna duyurulması, \n' +
        '11. Şirketin kamuoyunda bilinirliğinin sağlanması ve güncelliğinin korunabilmesi için internet sayfası ve sosyal medya hesaplarının güncel verilerle sürekliliğinin sağlanması, tanıtım ve reklam süreçlerinin yönetilmesi, \n' +
        '12. OSINIF içeriklerinden, Kişisel Veri Sahipleri’ nin en iyi şekilde faydalandırılması ve onların talep, ihtiyaç ve isteklerine göre özel hale getirilerek önerilmesi, \n' +
        '13. Şirkete talep ve şikayetlerini ileten Kişisel veri Sahipleri ile iletişime geçilmesi ve talep/şikâyet yönetiminin sağlanması, \n' +
        '14. İnternet sitesinde sunulan hizmetlerin geliştirilmesi ve sitede oluşan hataların giderilmesi, 15. Saklama ve arşiv faaliyetlerinin yürütülebilmesi ve yıllık birim faaliyet raporlarının oluşturulabilmesi amacıyla mevzuatta gösterilen usullerle arşiv tutulması, \n' +
        '16. Ziyaretçi kayıtlarının oluşturulması ve takibi, \n' +
        '17. Bina, personel ve ziyaretçi güvenliğinin temini, \n' +
        '18. Verilerin anonim hale getirilerek araştırma amacıyla istatistiki faaliyetlerde kullanılabilmesi, 19. Şirket adına Strateji Geliştirme Daire Başkanlığı öncülüğünde yeni stratejilerin geliştirilebilmesi, eski stratejilerin güncellenebilmesi ve gerekli analizlerin yapılması, \n' +
        '20. KVKK kapsamında yapılacak ilgili kişi başvurularının alınması ve yanıtlanabilmesi amaçlarıyla sınırlı olarak Kanun’un 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları kapsamında işlenir. \n' +
        'Bahsi geçen amaçlarla gerçekleştirilen işleme faaliyetinin, Kanun kapsamında öngörülen şartlardan herhangi birini karşılamıyor olması halinde, ilgili işleme sürecine ilişkin olarak Şirket tarafından açık rızanız temin edilmektedir.\n' +
        ' - İşlenen Kişisel Veri Kategorileri; Kimlik Bilgileri İletişim Bilgileri Lokasyon Bilgileri Özlük Bilgileri Hukuki İşlem Müşteri İşlem Fiziksel Mekân Güvenliği İşlem Güvenliği Finansal/Mali Bilgileri Mesleki Deneyim Bilgileri Pazarlama Bilgileri Görsel/İşitsel Bilgiler Özel Nitelikli Kişisel Veriler - Kişisel Verilerinizin Toplanma Yöntemleri Kişisel verileriniz; \n' +
        '• Web Sitesi, Uygulamalar, e posta, işe alım portalları dahil üçüncü şahıslara ait dijital mecralar veya bir yazılım üzerinden, \n' +
        '• Sözleşmeler, başvurular, formlar, çağrı merkezi, uzaktan destek, satış ve pazarlama birimi, Web sitesindeki çerezler (Web sitesinde kullanılan çerezler belirlenebilir kılmamaktadır, detaylı bilgi için aşağıda yer alan Çerez Hakkında Bilgilendirme isimli kısmı inceleyiniz), telefon gibi vasıtalar aracılığı ile \n' +
        '• İlgili Kişi ile yüz yüze yapılan görüşmeler aracılığı ile \n' +
        '• Kayıt formu, internet üzerinden doldurulan kayıt/başvuru formları, alındı ve harcama belgeleri, etkinliklerde kullanılan görüntü ve ses kayıt cihazları, güvenlik kamera kayıtları ile \n' +
        '• İnternet sitesinde yer alan sohbet başlatma butonu ve 08503088884 numaralı sabit hat aracılığı ya da “YKS-KPSS-LGS Uzmanlarımızdan Bilgi Alın!”, YKS Uzmanlarımıza Danışın” butonları ile tarafımızla iletişime geçilmesi sırasında, \n' +
        '• ŞİRKET resmi e-mail adresi olan info@osinif.com adresine ya da herhangi bir mail adresine, kişisel veri gönderilmesi durumunda toplanmaktadır. Kişisel verileriniz ayrıca otomatik yollarla https://www.osinif.com/ adresi ve uzantılarında kullanılan çerezler (cookie) vasıtasıyla da toplanmaktadır. Söz konusu çerezler, yalnızca ziyaretçinin siteyi tam verimlilikte kullanabilmesi için gerekli çerezler olup ziyaretçinin tercihlerini hatırlamak amacıyla kullanılmakta ve başka bir kişisel veri temin etmemektedir. Kişisel Veri İşlemenin Hukuki Sebepleri KVKK, kişisel verilerin işlenme şartlarını 5. maddesinin 2. fıkrasında listelemektedir. Eğer bir veri sorumlusu tarafından kişisel verilerin işlenme amaçları, KVKK’ da listelenmiş olan kişisel veri işleme şartları çerçevesinde değerlendirilebiliyorsa, o veri sorumlusu kişisel verileri hukuka uygun olarak işleyebilmektedir. Bu kapsamda Şirket tarafından da güdülmekte olan kişisel veri işleme amaçlarının, KVKK’ da düzenlenen kişisel veri işleme şartları kapsamında değerlendirilebildiği durumlarda Şirket tarafından kişisel veri işleme faaliyetleri gerçekleştirilmektedir. Şirket kişisel veri işleme şartları kapsamına girmeyen herhangi bir kişisel veri işleme faaliyetinde bulunmamaktadır.\n' +
        ' KVKK’da yer alan kişisel veri işleme şartları şunlardır;\n' +
        ' • İlgili kişinin açık rızasının bulunması, \n' +
        '• Kanunlarda açıkça öngörülmesi, \n' +
        '• Fiili imkânsızlık nedeniyle rızasını açıklayamayacak durumda bulunan veya rızasına hukuki geçerlilik tanınmayan kişinin kendisinin ya da bir başkasının hayatı veya beden bütünlüğünün korunması için zorunlu olması,\n' +
        ' • Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla sözleşmenin taraflarına ait kişisel verilerin işlenmesinin gerekli olması,\n' +
        ' • Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması, \n' +
        '• Veri sahibinin kendisi tarafından alenileştirilmiş olması, \n' +
        '• Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması, \n' +
        '• Veri sahibinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması. Özel nitelikli kişisel veriler için de temel işleme şartı açık rızadır ve Şirket temelde özel nitelikli kişisel veri işleme amacı gütmemektedir. Ancak faaliyetimiz gereği işlememiz gereken veya açık rızanız ile onay verdiğiniz özel nitelikli kişisel verileriniz de mevzuat dahilinde ölçülü olarak işlenmektedir.\n' +
        ' KVKK’da özel nitelikli kişisel verilerin işlenebilmesi için sayılan şartlar şunlardır; \n' +
        '• İlgili kişinin açık rızasının bulunması, \n' +
        '• Sağlık ve cinsel hayat dışındaki özel nitelikli kişisel veriler için kanunlarda açıkça öngörülmesi, \n' +
        '• Sağlık ve cinsel hayata ilişkin kişisel veriler ise ancak; kamu sağlığının korunması, koruyucu hekimlik, tıbbî teşhis, tedavi ve bakım hizmetlerinin yürütülmesi, sağlık hizmetleri ile finansmanının planlanması ve yönetimi amacıyla, sır saklama yükümlülüğü altında bulunan kişiler veya yetkili kurum ve kuruluşlar tarafından ilgilinin açık rızası aranmaksızın işlenebilir. Bir kişisel veri işleme faaliyetini hukuka uygun kılan bir veya birden fazla kişisel veri işleme şartı aynı anda bulunabilmektedir. Söz konusu amaçlarımızı gerçekleştirebilmek için yukarıda belirttiğimiz verilerinizin işlenmesi gereği hasıl olmaktadır. Şirketimize, kimlik bilgileri aktarılırken aslında işleme amaçlarımız dahilinde olmayan veriler de tarafımıza aktarılabilmektedir. İdari ve teknik tedbirler dahilinde söz konusu verileri mevzuatta öngörülen süreler sonunda siliyor ve/veya anonim hale getiriyoruz ancak her koşulda bu durumu temin etmek mümkün olmamaktadır. Bu halde, söz konusu verilerin işlenmesi amacıyla açık rızanıza başvurmak gerekmektedir\n',
      // ... continue with rest of content ...
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
        backgroundColor: COLORS.primary,
      }}>
      <DrawerScreensTitle
        style={{
          paddingLeft: 0,
        }}
        title={'Yasal Bilgiler'}
      />

      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          width: SIZES.width,
          alignItems: 'center',
        }}>
        {faqAccordion({
          SECTIONS,
        })}
      </ScrollView>
    </View>
  );
};

export default LegalInfoScreen;
