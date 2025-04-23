import { View, Text, ScrollView } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import Accordion from 'react-native-collapsible/Accordion';
import faqAccordion from '../../components/accordion/faqAccordion';
import DrawerScreensTitle from '../../components/drawer/drawerScreensTitle';

const FAQScreen = () => {
  const SECTIONS = [
    {
      title: 'Üyelik ücretli midir?',
      content:
        ' Üyeliklerimiz tamamen ücretsizdir. Platformumuz üzerinden yapacağınız satın alımlar yalnızca üye olduktan sonra gerçekleştirilebilir.',
    },
    {
      title: 'Şifremi unuttum ne yapmalıyım?',
      content:
        'Şifremi unuttum linkine tıklayın. Açılan sayfada, kullanıcı adınızı veya e-posta adresinizi girerek yeni şifre belirleme linkinin e-posta adresinize gönderilmesini sağlayabilir veya SMS ile giriş yapma seçeneğini kullanabilirsiniz.',
    },
    {
      title: 'Satın aldığım içerikler ne zaman aktif olur?',
      content:
        'Siz satın alma yaptığınız anda ilgili içerikleriniz direkt aktif olur ve platformumuz üzerinden hemen kulanmaya başlayabilirsiniz.',
    },
    {
      title: 'Ödeme seçenekleri nelerdir?',
      content:
        'İnternet sitemizdeki paket satış alanları üzerinden Kredi Kartı veya EFT Havale yöntemiyle satın alım işlemini gerçekleştirebilirsiniz.\n' +
        '\n' +
        '(Axess, Bonus Card, Bankkart Combo, Paraf, World, Maximum, Card Finans, Advantage, Adios, Garanti Miles Smiles, Shopfly ve Sağlam Kart kredi kartlarına 12 aya kadar vade farksız taksit fırsatıyla ödeme yapabilirsiniz.) \n' +
        '\n',
    },
    {
      title: 'Satın alma aşamasında niçin kullanıcı bilgilerimi vermeliyim?',
      content:
        'Kullanıcıların satın aldığı ürünlerin faturalandırılması, kurumsal faaliyetlerimiz çerçevesinde yasal olarak zorundadır. \n' +
        'İstenilen bilgiler, sadece faturalandırma ve işlem güvenliği için talep edilmektedir.\n' +
        'Gizlilik sözleşmesinde belirtildiği üzere tüm bilgileriniz sistemimizde saklı tutulmakta olup paylaşımı kesinlikle söz konusu değildir.',
    },
    {
      title: 'Satın alma kısmında çıkan dönem seçimi nedir?',
      content:
        'Satın alırken karşılaştığınız dönem seçimi ilgili eğitim-öğretim süresinin tarih ve dönemi ifade etmektedir. Hizmet alacağınız tarihe göre dönem seçimi yaparak satın alma yapabilirsiniz.',
    },
    {
      title: 'Satın alma yaptıktan sonra ne olacak?',
      content:
        'Satın alma sürecini tamamladığınızda sistemimize kayıt olduğunuz e-posta adresinize ulaşan Mail’de yer alan Kullanıcı Adı, Şifre ve Kurulum Bağlantısı ile sistemimize giriş yaparak paketinizi kullanmaya başlayabilirsiniz.',
    },
    {
      title: 'Banka havalesi ödeme bilgileri',
      content: '',
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: COLORS.primary,
      }}>
      <DrawerScreensTitle
        style={{
          paddingLeft: 0,
        }}
        title={'Sıkça Sorulan Sorular'}
      />

      <Text
        style={{
          ...FONTS.H3,
          fontSize: 14,
          color: COLORS.black,
          textAlign: 'center',
        }}>
        OSINIF hakkında daha detaylı bilgi almak için aşağıdaki sorulara bakabilirsin.
      </Text>
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          paddingTop: 20,
        }}>
        {faqAccordion({
          SECTIONS,
        })}
      </ScrollView>
    </View>
  );
};

export default FAQScreen;
