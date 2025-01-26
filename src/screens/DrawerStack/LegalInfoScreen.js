import { View, Text, ScrollView } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import Accordion from "react-native-collapsible/Accordion";
import faqAccordion from "../../components/accordion/faqAccordion";
import DrawerScreensTitle from "../../components/drawer/drawerScreensTitle";

const LegalInfoScreen = () => {
  const SECTIONS = [
    {
      title: "Mesafeli Satış Sözleşmesi",
      content:
        "                Mesafeli Satış Sözleşmesi\n" +
        "Önemli:\n" +
        "Bu hizmeti ilk defa kullanmadan önce Mesafeli Satış Sözleşmesi'nin tamamını dikkatle okuyunuz.\n" +
        " \n" +
        "Kullanıcı, Sözleşme konusu Dijital Hizmet'in ilk kullanımından veya çalıştırmasından itibaren işbu Sözleşmede geçen anlaşma koşullarıyla bağlı olduğunu, bu koşulları başka bir ihbara gerek kalmadan okumuş ve kabul etmiş sayılır. İşbu hükümleri kabul etmemesi halinde Kullanıcı, sözleşme konusu hizmetlerden yararlanamaz, dijital içerikleri izleyemez, dersleri takip edemez ve Dijital Hizmet'i kullanamaz. Bu koşullar dışındaki kullanım halleri Vertex Bilişim telif haklarının ihlali olarak nitelendirilecektir. İşbu sözleşme hükümlerinin Kullanıcı tarafından kabul edilmemesi durumunda sözleşme konusu Dijital Hizmet'i satın almamak, Dijital Hizmet'in satın alınmış olması halinde kullanmaya devam etmemek Kullanıcı’ nın sorumluluğundadır. Doping Bilişim, sözleşmeye konu Dijital Hizmet'in kullanımına başlandıktan sonra işbu Sözleşme hükümlerinin kabul edilmemesi sebebi ile hiçbir sorumluluk kabul etmez. Söz konusu Mesafeli Satış Sözleşmesi hükümleri, Dijital Hizmet'in bilgisayar, tablet veya telefonda kullanılmasına bakılmaksızın bütün versiyonlarında geçerlidir.\n" +
        "Sözleşme konusu Dijital Hizmetle ilgili tüm fikri ve sınai haklar Vertex Bilişim Teknolojileri A.Ş. ye aittir. Vertex Bilişim, ………….com’ da yer alan herhangi bir dijital içeriğin izinsiz olarak kullanılması, çoğaltılması, yayılması, satışa sunulması ve benzeri durumlarda ilgili kişi veya kişiler hakkında hukuki ve cezai yaptırımlara başvurulacaktır.\n" +
        " \n" +
        "1. KONU\n" +
        "İşbu Sözleşme'nin konusu; Alıcı' nın, Vetex  Bilişim’ e ait www………….com web sitesinden elektronik ortamda satın aldığı, işbu Sözleşme' de ve Ön Bilgilendirme Formu’ nda bahsi geçen nitelikleri taşıyan, madde 3.'te belirtilen Dijital Hizmet’in satışı ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.\n" +
        "İşbu Sözleşme kapsamında Kullanıcı’ ya sunulan Dijital Hizmet, seçmiş olduğu Dijital Hizmet içeriğinde yer alan kayıtlı içeriklerdir.\n" +
        "Alıcı, satışa konu Dijital Hizmet’in temel nitelikleri, satış fiyatı, ödeme şekli gibi Dijital Hizmet ile ilgili tüm ön bilgiler konusunda bilgi sahibi olduğunu, bu ön bilgileri elektronik ortamda onayladığını ve sonrasında elektronik ortamda Dijital Hizmet’i satın aldığını işbu Sözleşme hükümlerince kabul ve beyan eder. Ön Bilgilendirme Formu ve Alıcı adına gönderilecek Dijital Hizmet’in bedelini içerir fatura işbu Sözleşme’nin ayrılmaz parçasıdır.\n" +
        " \n" +
        "2. TARAFLAR VE TANIMLAR\n" +
        "2.1. Vertex Bilişim\n" +
        "Unvanı : VERTEX YAZILIM ELEKTRONİK BİLİŞİM İTHALAT İHRACAT SANAYİ VE TİCARET A.Ş.\n" +
        "MERSİS No: ………….\n" +
        "Adres : Muradiye Mah. Celal Bayar Üniversitesi Kampüsü Küme Evler Teknokent No:22 Yunusemre/MANİSA\n" +
        "Telefon (Müşteri Hizmetleri) : 0 236\n" +
        "E-mail : info@.............com\n" +
        "Kep : ………….@hs01.kep.tr\n" +
        "Web : www…………..com\n" +
        "2.2. Alıcı\n" +
        "Adı Soyadı: ……….\n" +
        "Adres: ……………..\n" +
        "Telefon: ……………\n" +
        "E-mail: …………….\n" +
        "2.3. Kullanıcı\n" +
        "Alıcı ya da Alıcı’ nın Kullanıcı olarak bildirmiş olduğu kimse, İşbu Sözleşme konusu Dijital Hizmet'i kullanan kişidir. Kullanıcı’ nın sınırlı ehliyetsiz (ergin olmayan çocuk) olması halinde; Mesafeli Satış Sözleşmesi’nin onaylanması ile Kullanıcı velisinin/vasisinin, Kullanıcı’ nın işbu Sözleşme’ nin tarafı haline gelmesine icazet verdiği kabul edilir.\n" +
        "Kullanıcı, işbu sözleşmenin kurulması esnasında vermiş olduğu bilgilerin eksiksiz ve doğru olduğunu ve sözleşmeye konu olan Dijital Hizmet'i hukuka aykırı bir amaçla kullanmayacağını kabul ve taahhüt eder.\n" +
        " \n" +
        "3. DİJİTAL HİZMET BİLGİLERİ VE ÜCRETİ\n" +
        "3.1. Alıcı, işbu Mesafeli Satış Sözleşmesi’nde (“Sözleşme”) ve Ön Bilgilendirme Formu’ nda özellikleri aşağıda detaylı olarak belirtilen özgün ve kayıtlı dijital içerik , hizmetlerini içermektedir. Hizmet Bedeli, tüm vergileri kapsar.\n" +
        " \n" +
        "Paket Adı\n" +
        "Paket İçeriği\n" +
        "Toplam Tutar\n" +
        "…..\n" +
        "…..\n" +
        "….. TL\n" +
        " \n" +
        "3.2. Satın alınan Dijital Hizmet’in diğer özellikleri ve kullanım koşulları ………….com web sitesinde yer alan bilgilerde ve işbu Sözleşme'nin ayrılmaz parçası sayılan Ön Bilgilendirme Formu’ nda ve detaylı olarak belirtilmiştir.\n" +
        " \n" +
        "4. DİJİTAL HİZMET KULLANIM (LİSANS) SÜRESİ\n" +
        "4.1. Dijital Hizmet kullanım süresi Alıcı tarafından satın alma işleminin gerçekleştiği tarihten itibaren  Dijital Hizmet bakımından ………….com internet sitesinde, Dijital Hizmet detaylarında öngörülen tarihe kadar geçen süre boyunca (YKS, LGS, KPSS, DGS, ALES paketleri ve bunlara dahil olan Hızlı Okuma Teknikleri paketi ilgili olduğu sınav tarihine kadar; ara sınıflar için olan paketler ilgili akademik yıl boyunca; Hızlı Okuma 60 gün boyunca, tekli İngilizce paketleri, ……..paketleri 180 gün boyunca ve……… paketi satın alma tarihinden itibaren 1 yıl boyunca) Kullanıcı’ nın erişimine online platformda açılır.\n" +
        "4.2. Paket içeriğine dahil olması halinde; Çözücü kredi ve Koçum Yanımda görüşme ve mesaj hakkı süreleri Dijital Hizmet süresince devam eder. Vertex Bilişimin Dijital Hizmet'inin sona erdiği gün, içerik dahilindeki Uygulama kredi ve/veya haklar, kullanılmamış olsa dahi silinir. Uygulama marketlerinden satın alınan paketlerle ilgili süreler paket içeriğinde belirtildiği gibidir.\n" +
        " \n" +
        "5. CAYMA HAKKI\n" +
        "5.1. İşbu Sözleşme konusu Dijital Hizmet, online ve kayıtlı dijital içeriktir. Bu bakımdan, 6502 sayılı Tüketicinin Korunması Hakkında Kanun’ a dayanarak hazırlanan Mesafeli Sözleşmeler Yönetmeliği’nin 15/ğ Maddesi uyarınca “elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmeler” kapsamında kalması sebebiyle Alıcı’ nın cayma hakkı bulunmamaktadır.\n" +
        " \n" +
        "6. ÖDEME YÖNTEMLERİ\n" +
        "6.1. Ödeme, aşağıda belirtilen yöntemlerden biri ile yapılabilecektir:\n" +
        "Kredi Kartı ile Ödeme: www………...com web sayfasında satın alınmak istenen Dijital Hizmet’ in ödeme bilgileri aşamasında yer alan yönergelerin izlenerek kredi kartı kullanmak sureti ile belirli bankalarla anlaşmalı olarak, taksit seçenekleriyle yapılan ödeme yöntemidir. Bu ödeme yönteminin seçilmesi halinde, Hizmet Bedeli, yetkili elektronik ödeme sağlayıcı kuruluş tarafından tahsil edilmektedir. Taksitle ödeme yönteminin seçilmesi halinde, ödeme peşin fiyat üzerinden gerçekleşir, ödeme sağlayıcı kuruluştan kaynaklı vade farkı Alıcı’ ya yansıtılmaz.\n" +
        "Havale/Eft Yolu ile Ödeme: Ödeme,Vertex  Bilişim’ in www……...com web sayfasında satın alınmak istenen Dijital Hizmet’ in “Havale/EFT ile Ödemek İçin” ödeme yönteminin seçilerek satın almanın devam ettirilmesidir. Ödeme işlemini tamamlamak için belirttiğiniz e-mail adresinize gönderilen banka hesap numaralarımızdan birine 5 gün içerisinde ödeme yapmanız gerekmektedir. Havale/EFT yolu ile ödeme sırasında ödeme açıklamasına, “Havale/EFT ile Ödemek İçin” butonunu tıkladığınızda size özel oluşturulan referans numarasını yazmanız gereklidir. Bu ödeme yönteminin seçilmesi halinde, ödeme sağlayıcı kuruluşlar tarafından ilgili ödeme için havale veya EFT masrafları Alıcı’ ya yansıtılabilir. Böyle bir durumda, Vertex Bilişim’ in ilgili havale veya EFT masraflarından sorumluluğu yoktur\n" +
        "İyzico ile Ödeme: Ödeme, Vertex Bilişim’in www………..com web sayfasında satın alınmak istenen Dijital Hizmet’ in “iyzico ile Ödeme İçin” ödeme yönteminin seçilerek satın almanın devam ettirilmesidir. Alıcı, Onayla ve Devam Et butonunun tıklanmasının ardından iyzico Güvenli Ödeme sayfasına yönlendirilerek ödemesini gerçekleştirir.\n" +
        "6.2.Ödeme sırasında Alıcı tarafından yapılabilecek hatalar nedeni ile ödemede çıkabilecek aksaklıklardan Vertex Bilişim sorumlu değildir.\n" +
        "6.3. İnternet üzerinden kredi kartı ile yapılan ödemelerin bedelleri Alıcının kredi kartından otomatik olarak çekilir. Ödeme işlemi onaylandıktan sonra içerikler kullanıma açılır. Alıcı Havale/Eft ile ödemeyi gerçekleştirdiğinde, Dijital Hizmet ücretinin hesaba geçmesinin ardından 24 saat içerisinde Dijital Hizmet, Kullanıcı’ nın erişimine online açılır. Vertex Bilişim https://www..............com internet sitesi indirim veya artırım ücret uygulamasını döneme göre değiştirme hakkına sahiptir.\n" +
        " \n" +
        "7. GENEL HÜKÜMLER\n" +
        "7.1. İşbu Sözleşme Alıcı ve Vertex  Bilişim arasında; Alıcı tarafından Ön Bilgilendirme Formu’ nun okunduğunun ve teyit edildiğinin; İşbu Mesafeli Satış Sözleşmesi’ nin okunduğunun ve kabul edildiğinin beyan edildiği an internet üzerinden akdedilmiş olup, bu andan itibaren hüküm ve sonuçlarını doğurur. Sözleşme'nin bir nüshası Alıcı’ nın belirttiği e-mail adresine gönderilir.\n" +
        "7.2. Alıcı, satın aldığı Dijital Hizmet ile ilgili; Ön Bilgilendirme Formu’ nu ve Mesafeli Satış Sözleşmesi’ni onaylamasını ve Dijital Hizmet bedeline ilişkin ödemeyi gerçekleştirmesini müteakip başka bir işleme gerek kalmaksızın satış tamamlanır. Anılan onay işlemleri, Dijital Hizmet’ in kullanım kapsam ve şartlarını kabul anlamına gelir. Bu suretle Dijital Hizmet, belirli süre boyunca ve işbu Sözleşme’ de yer alan koşullarla Kullanıcı’ nın erişimine, online olarak açılır.\n" +
        "7.3. Dijital Hizmet yalnızca bir bilgisayar ve bir telefonda veya bir tablet ve bir telefonda kullanılabilir. Tablet ve bilgisayarda birlikte kurulum yapılamamaktadır. Hızlı Okuma paketi ise yalnızca bilgisayarda kullanılabilmektedir. Dijital Hizmet'in kullanıldığı cihazlardan herhangi birinin sıfırlanması veya değiştirilmesi durumlarında, her cihaz için en fazla 3 defa değişiklik yapılabilmektedir. Vertex Bilişim, bu durumdan kaynaklanabilecek olası zararlardan sorumlu olmaz.\n" +
        "7.4. Dijital Hizmet’e ek olarak soru sorma hakkı, ……………………….. uygulamalarına üyelik işlemi otomatik olarak tamamlanır. Kullanıcı bu bakımdan, https://kocumyanimda.com/, https://simdianladim.com/, https://cozucu.app/ yer alan “Kullanıcı Üyelik Sözleşmesi” lerini onaylamış kabul edilir.\n" +
        "7.5. Alıcı, Kullanıcı’ ya ait bilgileri tam ve eksiksiz şekilde girmekle yükümlü olup, Alıcı’ nın eksik veya hatalı şekilde bilgi vermesi halinde Dijital Hizmet’in kullanıma açılamaması durumunda Vertex Bilişim’ in sorumluluğu bulunmamaktadır. Alıcı, işbu Sözleşme’nin kurulması esnasında Vertex Bilişim tarafından Kullanıcı’ ya ait kişisel verilerin işlenmesine ilişkin gerekli bilgilerin temin edildiğini, bu kapsamda Vertex Bilişim ile paylaştığı Kullanıcı’ ya ait kişisel verileri paylaşmaya yetkili olduğunu, Kullanıcı’ ya yönelik KVKK kapsamında gerekli aydınlatma yükümlülüğünü yerine getirdiğini (gereği halinde açık rızasını aldığını), bu sebeple her türlü sorumluluğun kendisinde olduğunu kabul eder.\n" +
        "7.6. Satın alınan Dijital Hizmet’ in özelliğine göre, Ön Bilgilendirme Formunda ayrıntıları, süresi ve şekli belirlendiği üzere, taahhüt edilen edimler Vertex Bilişim tarafından işbu Sözleşmeye ve Ön Bilgilendirme Formuna uygun olarak ifa edilir.\n" +
        "7.7. Satın alınan Dijital Hizmet programı, satış ve kullanımı 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği (RG:27.11.2014/29188) hükümleri ile ilgili mevzuat hükümlerine tabidir.\n" +
        "7.8. Satın alınan her bir Dijital Hizmet programı Sözleşmede belirtilen sürede, her halde 30 günlük yasal süreyi aşmamak kaydı ile Kullanıcı’ nın kullanımına açılır. Bu süre içinde Dijital Hizmet programı kullanıma açılmaz ise, Kullanıcı sözleşmeyi sona erdirebilir.\n" +
        "7.9. Alıcı, satın aldığı Dijital Hizmet programının bedelini ödemez veya banka kayıtlarında iptal ederse, Vertex Bilişim’ in Dijital Hizmet programını içeren dijital içeriği Kullanıcı’ nın kullanımına açma yükümlülüğü sona erer.\n" +
        "7.10. Dijital Hizmet programını içeren dijital içerik Kullanıcı kullanımına açıldıktan sonra, Alıcı’ nın ödeme yaptığı kredi kartının yetkisiz kişiler tarafından haksız olarak kullanıldığı tespit edilirse ve satılan program bedeli ilgili banka veya finans kuruluşu tarafından Vertex Bilişim' e ödenmez ise, Vertex Bilişim sözleşmeyi sona erdirir.\n" +
        "7.11. Vertex Bilişim’ in öngöremeyeceği mücbir sebepler oluşursa ve Dijital Hizmet programı süresinde kullanıma açılmaz ise, durum Alıcı’ya bildirilir. Alıcı, siparişin iptalini veya engel ortadan kalkana dek dijital içeriğin kullanıma açılmasının ertelenmesini talep edebilir. Alıcı siparişi iptal ederse; ödemeyi havale/eft ile yapmış ise iptalinden itibaren iade ödemesi 10 gün içerisinde gerçekleştirilir. Alıcı, ödemeyi kredi kartı ile ya da iyzico ödeme yöntemi ile yapmış ise ve iptal ederse, bu iptalden itibaren yine 10 gün içinde Dijital Hizmet bedeli bankaya iade edilir. Ancak Alıcı, ilgili bankanın para iadesini hesabına 2-3 haftalık bir sürede yapabileceğini kabul eder ve Vertex Bilişim’ in bundan doğan bir sorumluluğu olmadığını bilir.\n" +
        " \n" +
        "8. KULLANICI’ NIN DİJİTAL HİZMET’İ KULLANIM KAPSAMI, YÜKÜMLÜLÜKLERİ VE BEYANLARI\n" +
        "Alıcı/Kullanıcı, madde 3’ te belirtilen Dijital Hizmet’i satın almadan önce Dijital Hizmet ile ilgili tüm ön bilgileri okuduğunu, anladığını, teyit ve kabul ettiğini internet ortamında onaylamakla beyan etmiş sayılır. Alıcı/Kullanıcı, söz konusu Dijital Hizmet’i satın alarak Ön Bilgilendirme Formunda ve belirtilen sınırlar ve şartlar kapsamında kullanım ve faydalanma hakkını elde etmiştir.\n" +
        "8.1. Kullanıcı’ nın Beyanları\n" +
        "Dijital Hizmet, internet erişimi gerektirir. Söz konusu internet bağlantısının sağlanması, kalitesi ve güvenliği Kullanıcı’ nın sorumluluğundadır. Kullanıcı, Dijital Hizmet'in kullanılmasıyla ilgili olarak elektronik cihazından/cihazlarının donanımsal eksikliklerinden; internet kalitesi ya da erişiminden kaynaklanan sorunlardan Vertex Bilişim’ in hiçbir koşul altında sorumlu olmayacağını kabul ve beyan eder.\n" +
        "İşbu Sözleşmeye konu Dijital Hizmet, internet erişimi gerektirir. Söz konusu Dijital Hizmet'in kullanılabilmesi bakımından internet bağlantısının sağlanması, kalitesi ve güvenliği Kullanıcı’ nın sorumluluğunda olup bu sorumluluk hiçbir koşul altında Vertex Bilişim’ e yüklenemez. Kullanıcı, Dijital Hizmet'in kullanılması ile ilgili olarak elektronik cihazından/cihazlarından, her türlü donanımsal eksiklikten, internet kalitesi ve erişiminden kaynaklanan sorunlardan Vertex Bilişim’in hiçbir şekilde sorumlu olmayacağını kabul ve beyan eder.\n" +
        "Kullanıcı, Vertex Bilişim’in uzman, soru birimi ve teknik destek çalışanları dahil herhangi bir çalışanına genel ahlaka ve kamu düzenine aykırı, uygunsuz, onur kırıcı yorum, paylaşım, söz ve/veya davranışlarda bulunması halinde; Dijital Hizmet'in kullanımının Vertex Bilişim tarafından tek taraflı olarak sonlandırılabileceğini, sistem dışına çıkarılabileceğini kabul ve beyan eder.\n" +
        "Kullanıcı, Dijital Hizmet'i kullanırken gerçekleştirdiği tüm eylemlerden sorumlu olduğunu kabul ve beyan eder.\n" +
        "8.2. Kullanıcı’ nın Yükümlülükleri\n" +
        "Kullanıcı, şifre ve Kullanıcı adının gizli kalması için gerekli dikkat ve özeni göstereceğini, şifreyi ve Kullanıcı adını herhangi bir üçüncü şahsa açıklamayacağını, Dijital Hizmet'i herhangi bir üçüncü şahsa kullandırmayacağını, şifresinin yetkisiz üçüncü şahıslar tarafından ele geçirildiğini öğrenmesi veya bundan şüphelenmesi halinde derhal Vertex Bilişim’ e haber vereceğini kabul, beyan ve taahhüt eder.\n" +
        "Kullanıcı, sözleşmeye konu Dijital Hizmet'i işbu Mesafeli Satış Sözleşmesi’ nde yer alan hükümlere uygun olarak kullanacağını kabul, beyan ve taahhüt eder.\n" +
        "Kullanıcı, Dijital Hizmet'in yalnızca şahsı tarafından kullanılacağını, Dijital Hizmet'i üçüncü bir şahsa kiralamayacağını, satışını yapmayacağını kabul, beyan ve taahhüt eder.\n" +
        "Kullanıcı, satın alma esnasında vermiş olduğu bilgilerin eksiksiz ve doğru olduğunu ve bu bilgilerde sonradan meydana gelen herhangi bir değişikliği Vertex Bilişim’ e derhal bildireceğini kabul beyan ve taahhüt eder.\n" +
        "Kullanıcı, Dijital Hizmet'i kullanırken herhangi bir gizlilik ihlali söz konusu olması halinde derhal ve gecikmeksizin Vertex Bilişim’ i bilgilendireceğini kabul, beyan ve taahhüt eder.\n" +
        "Kullanıcı, deprem, yangın, sel gibi tabii afetler veya savaş, terör eylemleri gibi sebeplerle, ya da internet altyapısı, veri hatları gibi ağ iletişim altyapısına dayalı unsurlarda meydana gelebilecek ve Vertex Bilişim’ in elinde olmayan sebeplerle Dijital Hizmet'in kullanılamaması durumunda Vertex Bilişim’ in herhangi bir sorumluluğunun olmayacağını, herhangi bir nam altında Vertex Bilişim’ den tazminat veya diğer herhangi bir talepte bulunmayacağını kabul, beyan ve taahhüt eder.\n" +
        "Kullanıcı, almış olduğu ücretli içeriğe sahip içeriği kullanması veya indirmesi sebebiyle sistemine herhangi bir zarar geldiğini, indirilen içerikten dolayı sistemine virüs gibi kötü amaçlı kodların bulaştığını öne sürerek Vertex Bilişim’ den herhangi bir tazminat talebinde veya diğer herhangi bir talepte bulunamaz.\n" +
        "Kullanıcı, Vertex Bilişim’ in sunduğu Dijital Hizmet'i alması dolayısıyla Vertex Bilişim tarafından elde edilen bilgilerin tamamen kendi rızası ile elde edilmiş olduğunu, Kullanıcı satın aldığı dijital içerikleri görüntüleyebilmesi için gerekli olan yazılımların (örneğin Media Player) lisanslı olduğunu, lisansız yazılımların kullanılmasından oluşabilecek herhangi bir sorundan Vertex Bilişim’ in herhangi bir sorumluluğunun olmadığını kabul, beyan ve taahhüt eder.\n" +
        "Kullanıcı, sözleşme konusu Dijital Hizmet'i yalnızca bireysel olarak kullanacağını, herhangi bir üçüncü şahsın kullanımına izin vermeyeceğini, her ne şekilde olursa olsun ticari amaçla kullanmayacağını kabul, beyan ve taahhüt eder.\n" +
        "Kullanıcı, Dijital Hizmet'i kullanırken gerçekleştirdiği tüm eylemlerden sorumlu olduğunu kabul ve beyan eder.\n" +
        " \n" +
        "9. VERTEX BİLİŞİM’İN BEYANLARI VE TAAHHÜTLERİ\n" +
        "9.1. Vetex Bilişim, işbu Sözleşme konusu Dijital Hizmet’in Ön Bilgilendirme Formunda belirtilen niteliklere uygun olmasından sorumludur.Vertex  Bilişim tarafından sağlanan Dijital Hizmet’lere ilişkin dijital içeriklerin Alıcı’ ya ait elektronik cihazlarda çalıştırılması için üçüncü taraflarca sağlanan uygulamalara ilişkin her türlü sorumluluk Kullanıcı’ ya aittir. Vertex Bilişim, doğrudan doğruya Dijital Hizmet’le ilgili olmayan internet bağlantısı, cihaz, teknik ve Kullanıcı kaynaklı sorunlardan hiçbir koşul altında sorumlu tutulamaz. Ayrıca Vertex Bilişim, Dijital Hizmet'in dayandığı yazılımın hatasız ve kesintisiz çalışacağının garantisini vermez.\n" +
        "9.2. Vertex Bilişim, Ön Bilgilendirme Formunda mevcut mücbir sebepler hariç olmak üzere, işbu Sözleşme ve Ön Bilgilendirme Formu kapsamında satın alınan tarihten Dijital Hizmet bakımından dopinghafiza.com internet sitesinde Dijital Hizmet detaylarında öngörülen tarihe kadar sürekliliğini sağlamakla yükümlüdür. Dijital Hizmet’de yer alan dijital içeriklerin müfredat değişikliği vb. sebeplerden dolayı değiştirilmesi, güncellenmesi ve içeriklerin iyileştirilmesi amaçlarıyla bu süre içerisinde Alıcı’ nın dijital içeriklere erişememesi, sürekliliğin ihlali anlamına gelmeyecektir.\n" +
        "9.3. Vertex  Bilişim, Dijital Hizmet’in sunumunun Alıcı’ya teslim edilmesinin (ifanın) kendisinden kaynaklanmayan bir sebep ile imkansızlaşması halinde, sözleşmenin ifasının imkansız olduğunu öğrendiği tarihten itibaren 3 (üç) gün içinde Alıcı' ya bildirmekle yükümlü olacaktır. Vertex Bilişim ayrıca söz konusu Dijital Hizmet ile ilgili meydana gelecek değişiklikleri www………….com resmi web sitesinde, SMS vasıtası ile veya belirleyeceği diğer bir yöntem ile tüm Alıcı/Kullanıcı' lara duyurmakla yükümlüdür.\n" +
        "9.4. Dijital içerikler; yazılım geliştirme, müfredatın güncellenmesi ve benzeri sebeplerle belirli günlerde erişime kapatılabilmektedir. Alıcı/Kullanıcı, dijital içeriklerin Vertex Bilişim’ den kaynaklanmayan sebeplerle kesintiye uğraması ya da performans seviyesinde farklılıklar gözlenmesi halinde Vertex Bilişim’ in bu durumu düzeltmek için gerekli özeni ve çabayı gösterdiğini bilir ve anılan durumlarda Vertex Bilişim’ in tazminat yükümlülüğü bulunmadığını beyan ve kabul ve beyan eder.\n" +
        "9.5. Vertex Bilişim platformunda, piyasadaki benzer standartlar dahilinde kullanıma engel olmayacak seviyede hata, kusur ya da kesinti oluşabilir.\n" +
        "9.6. Dijital içeriklerin geliştirilmesi, müfredata uyarlanması ve güncellenmesi gibi sistem ve içerik çalışmalarının, elde olmayan sebeplerle on günden uzun süreli olarak Vertex Bilişim platformunu kesintiye uğratması halinde Vertex Bilişim; Alıcı/Kullanıcı’ ya programın kullanım miktarı kadar bedelden indirim yaparak iadesini gerçekleştirebilir.\n" +
        "9.7. Vertex Bilişim yalnızca işbu Sözleşme’ de ve Ön Bilgilendirme Formu’ nda bilgileri yer alan Dijital Hizmet’i Alıcı’ ya sağlamakla yükümlü olup, Alıcı/Kullanıcı’ya bir başarı veya kesin bir sonuç taahhüdünde bulunmamaktadır. Dijital Hizmet’in Alıcı/Kullanıcı’ nın subjektif beklentisine uygun olmamasından ve bu sebeplerle ortaya çıkabilecek doğrudan veya dolaylı zararlardan hiçbir şekilde Vertex Bilişim sorumlu değildir.\n" +
        "9.8. Vertex Bilişim, Dijital Hizmet ile sunulan herhangi bir içerik sonucunda maruz kalınan kayıp veya hasarlardan, veri kaybından veya herhangi bir ses, görüntü, fotoğraf, yazılım, teçhizat veya içerikteki hata, hasar ya da bozulmalardan, Dijital Hizmet’in Alıcı tarafından kullanımı neticesinde oluşacak herhangi bir telif hakkının ve/veya mülkiyet hakkının ihlalinden hiçbir şekilde sorumlu olmayacaktır. Ayrıca, Kullanıcı’nın işbu Sözleşme hükümlerine aykırı eylemleri neticesi meydana gelen zararlardan Vertex Bilişim hiçbir şekilde sorumlu olmayacaktır.\n" +
        "9.9. Vertex Bilişim, Dijital Hizmet ile sunulan her türlü dijital içerik üzerinde, tamamen kendi takdirinde olmak üzere, değişiklik yapma, makul sınırlar içinde kalmak üzere, gerekli olan içeriği kaldırma ve/veya yeni bir içerik ekleme, içerikleri güncel Dijital Hizmet programlarına uygun hale getirmek amacıyla önceden bildirimde bulunmaksızın güncelleme yapma yetkilerine sahiptir.\n" +
        " \n" +
        "10. SÖZLEŞMENİN, SÜRESİ, SONA ERMESİ VE FESHİ\n" +
        "10.1. İşbu Sözleşme, bu Sözleşme’ nin 4.1. bendinde belirtildiği süre sonunda başka hiçbir işleme gerek olmaksızın, kendiliğinden sona erer.\n" +
        "10.2. Paket içeriğine dahil olması halinde; Çözücü kredi ve Koçum Yanımda veya Şimdi Anladım görüşme ve mesaj hakkı süreleri, Vertex Bilişim Dijital Hizmet süresince devam eder.Vertex Bilişim Dijital Hizmet’inin sona erdiği gün, içerik dahilindeki Uygulama kredi ve/veya haklar, kullanılmamış olsa dahi silinir. Uygulama marketlerinden satın alınan paketlerle ilgili süreler paket içeriğinde belirtildiği gibidir.\n" +
        "10.3. Vertex Bilişim, Alıcı/Kullanıcı' nın İşbu Sözleşme'den doğan yükümlülüklerini İşbu Sözleşme’ de, belirtilen şekilde yerine getirmemesi halinde derhal ve bildirimsiz olarak Sözleşme’ yi feshedebilir. Bu halde Alıcı/Kullanıcı, Vertex Bilişim’ den hiçbir bedel talep edemez.\n" +
        "10.4. Kullanıcı’ nın, Vertex Bilişim’in uzman, soru birimi ve teknik destek çalışanları dahil herhangi bir çalışanına genel ahlaka ve kamu düzenine aykırı, uygunsuz, onur kırıcı yorum, paylaşım, söz ve/veya davranışlarda bulunması halinde; Vertex Bilişim kullanımı ve Sözleşme Vertex Bilişim tarafından tek taraflı olarak ve bildirimde bulunmaksızın sonlandırılabilir.\n" +
        "10.5. Satın alınan Dijital Hizmet’e ilişkin dijital içeriklerin geliştirilmesi, müfredata uyarlanması ve güncellenmesi gibi sistem ve içerik çalışmalarının, elde olmayan sebeplerle on günden uzun süreli olarak Vertex Bilişim platformunu kesintiye uğratması halinde Vertex Bilişim; Alıcı/Kullanıcı’ ya programın kullanım miktarı kadar bedelden indirim yaparak iade gerçekleştirilebilir ve Sözleşme sonlandırılabilir.\n" +
        " \n" +
        "11. LİSANS\n" +
        "11.1. İşbu Sözleşmeye konu Dijital Hizmet’in satın alınmasıyla Vertex Bilişim’ e ait Eser’in (Dijital Hizmet) münhasır olmayan ve yalnızca kullanım hakkına ilişkin lisansın, Kullanıcı’ya sınırlı ve süreli olarak tevdii söz konusudur.\n" +
        "11.2. Eser, yürürlükteki her türlü mevzuat ile korunmakta olup, İşbu Sözleşme ile Kullanıcı’ya Eser’den doğan herhangi bir mali ya da manevi hakkın devri yapılmamakta; yalnızca Fikir ve Sanat Eserleri Kanunu kapsamında münhasır olmayan kullanım lisansı, ticari olmayan ve kişisel kullanım için, Dijital Hizmet içeriğinde belirlenen süre boyunca (TYT, AYT, DGS, LGS, ALES, İNGİLİZCE ve KPSS paketleri ve bunlara dahil olan Hızlı Okuma Teknikleri paketi sınav tarihine kadar, ara sınıflar için olan paketler ilgili akademik yıl boyunca, ara sınıflar+ LGS sınav tarihine kadar ve tekli alınan Hızlı Okuma Teknikleri paketi 60 gün boyunca, tekli İngilizce paketleri 180 gün boyunca) tevdi olunmaktadır.\n" +
        "11.3. Vertex Bilişim, işbu Sözleşme’ nin Kullanıcıya bırakmadığı Eser’ e ilişkin her türlü hakkı, mülkiyeti ve menfaati (bunlarla sınırlı olmamakla birlikte tüm Fikri ve Sınai Mülkiyet Hakları dahil) açıkça saklı tutar.\n" +
        "11.4. Kullanıcı, İşbu Sözleşme konusu lisanstan doğan, Vertex  Bilişim’ in ve tedarikçilerinin fikri mülkiyet haklarını ihlal ederek; eseri izinsiz kopyalaması, çoğaltması, dağıtması ya da izin gerektirecek şekilde görüntülemesi, bazı çalışmalarda kullanarak türetmesi (türevlerini oluşturması) gibi hallerde, Vertex Bilişim’ e 5.000.000 TL (beşmilyon TL) cezai şartı herhangi bir mahkeme kararına gerek olmaksızın ödemeyi; bu cezai şartın fahiş olmadığını, ihlalin ve kusurun ağırlığına göre Vertex Bilişim’ in bu ceza miktarını artırabileceğini ve mahkemelerden terkini veya tenkisini talep etmeyeceğini peşinen kabul, beyan ve taahhüt eder. Vertex Bilişim, bu ihlalden dolayı uğradığı zararlar nedeniyle, ayrıca, ilgili mevzuat çerçevesinde suç veya ceza öngören hükümlerden doğan ve/veya Borçlar Kanunu, Türk Ticaret Kanunu, Rekabet Hükümleri ve ilgili mevzuat uyarınca tazminat ve/veya tüm dava haklarını saklı tutar.\n" +
        " \n" +
        "12. KULLANIM SINIRLARI\n" +
        "12.1. Kullanıcı, Dijital Hizmet’in yahut Dijital Hizmet’de sunulan içeriğin herhangi bir yazılım bileşenine ilişkin olarak kısmen veya tamamen tersine mühendislik yapamaz, uygunsuz bir erişim elde etme teşebbüsünde bulunamaz, Dijital Hizmet'in bir kısmını ya da tamamını kopyalayamaz, taklit edemez, 2. El dahil olmak üzere satışını yapamaz, sosyal medya ortamlarında ve diğer internet sitelerinde yayınlayamaz ve bu platformlarda satışa sunamaz, Dijital Hizmet’i, Mesafeli Satış Sözleşmesi ve Ön Bilgilendirme Formu’nda yer alan amaçlar haricinde kullanamaz.\n" +
        "\n",
    },
    {
      title: "Açık Rıza Metni",
      content:
        "VERTEX YAZILIM KULLANICI AÇIK RIZA       METNİ\n" +
        "VERTEX YAZILIM ELEKTRONİK BİLİŞİM İTHALAT İHRACAT SANAYİ VE TİCARET A.Ş. , kısaca Vertex Yazılım tarafından,  Vertex Yazılım dijital ürününü satın almam sırasında kişisel verilerim hakkında, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“Kanun”) uyarınca hazırlanmış Vertex Yazılım Kullanıcı Aydınlatma Metni aracılığıyla bilgilendirildim.\n" +
        "Vertex Yazılım tarafından verilerimin dijital ürününü satın almam kapsamında:\n" +
        "Yurtdışına Veri Aktarımı Hakkında Açık Rıza\n" +
        "\n" +
        "Vertex Yazılım anketlerini doldurmam (Örn: Google, Facebook anketleri), Whatsapp aracılığıyla bilgilendirilmelerin yapılması ya da verilerimin tutulduğu, aktarıldığı sistemlerin, e-posta sağlayıcıların veri tabanlarının yurtdışında konumlandırılmış olması nedeniyle veyahut bilişim teknolojileri, pazarlama/reklam faaliyetleri ya da uzmanlık gerektiren danışmanlık vb. konularda Vertex Yazılım’ın yurt dışında yerleşik iş ortakları, tedarikçileri ve hizmet sağlayıcıları ile paylaşılması sırasında yurtdışına aktarım yapılmasına özgür irademle açık rıza veriyorum.\n" +
        "\n" +
        "Analiz/İstatistik/Pazarlama Çerezleri Hakkında Açık Rıza\n" +
        "\n" +
        "Kişisel verilerimin, bana özel olanak ve teklifler sunulması, genel veya bana özel kişiselleştirilmiş kampanyalar, avantajlar, promosyonlar, reklamların oluşturulması, kampanya, yarışma, çekiliş ve diğer etkinliklerin düzenlenmesi, segmentasyon, profilleme, raporlama, pazarlama ve analiz çalışmalarının yapılması, Mobil Uygulama, Site veya diğer 3. taraf ortamlarında Vertex Yazılım’a ait reklamların ve pazarlama/iletişim faaliyetlerinin (Mobil Uygulama ve Site’deki bildirimler, pop-up gösterimi, kişiye özel teklifler, kullanıcı ekranlarının özelleştirilmesi, anket vs.) yürütülmesi ile kullanıcı deneyimini iyileştirmeye yönelik çalışmaların yapılması amacıyla işlenmesine özgür irademle açık rıza veriyorum.\n" +
        "\n" +
        "Ticari İleti Hakkında Açık Rıza\n" +
        "\n" +
        "6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun gereğince (ETDHK), kişisel verilerimin; ihtiyaçlarım doğrultusunda bana uygun ürün, uygulama, avantaj veya kampanyadan yararlanabilmem; genel bilgilendirme yapılması, tanıtım, reklam, promosyon, satış ve pazarlama, kutlama, temenni amacıyla işlenmesi ve bu doğrultuda iletişim adreslerime; Vertex Yazılım adına bu konuda gizlilik yükümlülüğü altında hizmet veren 3. Kişiler tarafından çağrı, kısa mesaj (SMS), multimedya nesneleri içeren MMS, fax, otomatik arama makineleri, e-posta ve benzeri iletişim kanallarından iletilecek veri, ses ve görüntü içerikli bilgilendirme, tanıtım ve pazarlama iletilerinin gönderilmesi bakımından ad, soyad ve iletişim numara, e-posta ve adres bilgilerimin işlenmesine özgür irademle açık rıza veriyorum.\n" +
        "\n" +
        "\n" +
        "Aydınlatma Metni’ nde açıklandığı üzere; işlenen ve saklanan verilerimin neler olduğu ve hangi amaçlar doğrultusunda işlendiği, hangi kişi, kurum ve kuruluşlara aktarım yapıldığı konularında bilgilendirildim. İrademin değişmesi halinde ise 6698 sayılı Kanunun 11. maddesi uyarınca haklarımın neler olduğunun bilincindeyim.\n" +
        "\n",
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: 10,
        backgroundColor: COLORS.primary,
      }}
    >
      <DrawerScreensTitle
        style={{
          paddingLeft: 0,
        }}
        title={"Yasal Bilgiler"}
      />

      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          width: SIZES.width,
          alignItems: "center",
        }}
      >
        {faqAccordion({
          SECTIONS,
        })}
      </ScrollView>
    </View>
  );
};

export default LegalInfoScreen;
