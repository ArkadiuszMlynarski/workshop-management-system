# Workshop Management System

Głównym zadaniem aplikacji jest zarządzanie usługami serwisów samochodowych. Aplikacja ma na celu ułatwienie kontaktu pomiędzy potencjalnym klientem a warsztatem, dzięki przejrzystości oraz łatwości w obsłudze. </br>

## Użyte technologie

- Java wraz z frameworkiem Spring Boot
- ReactJS
- PostgreSQL

Katalog **server** zawiera implementację serwera udostępniającego RESP API.</br>
Katalog **client** to aplikacja uzywająca frameworka React do połączenia z serwerem.</br>


## Charakterystyka aplikacji

Użytkownik może posiadać następujące role:</br>
•	Użytkownik</br>
•	Właściciel warsztatu</br>
•	Administrator</br>
Nieautoryzowany użytkownik ma jedynie możliwość rejestracji konta bądź zalogowania się.</br></br>

Rola *Użytkownik* posiada najmniej funkcjonalności, jedną z głównych jest zgłaszanie usterek występujących w jego samochodach. Może on również ocenić usługę wykonaną w danym warsztacie. Ponadto może on również zgłosić swój warsztat, aby był dostępny w serwisie, co automatycznie nadaje mu rolę Właściciela warsztatu.</br>
Rola *Właściciel* warsztatu ma możliwość przeglądania wszystkich zgłoszonych usterek przez innych użytkowników, zaoferowania swojej usługi potencjalnemu klientowi, dodawania kolejnych warsztatów, czy też zgłoszenia nieprawidłowej opinii o własnym warsztacie administratorowi.</br>
Rola *Administrator* ma dostęp do panelu administratora, dzięki któremu może zarządzać użytkownikami, tj. przeglądać, edytować, usuwać ich, bądź nadawać prawa Administratora. Ma on również możliwość zweryfikowania zgłoszonych przez użytkowników warsztatów oraz wgląd w zaakceptowane wcześniej serwisy samochodowe. Dzięki wspomnianemu panelowi, może przeglądać zgłoszone przez Właścicieli warsztatów opinie oraz blokować je.</br></br>


## Rola użytkownika
### Proces zgłaszania usterki
Głównym zadaniem użytkownika jest zgłaszanie usterek związanych z posiadanym pojazdem. Aby to zrobić, musi zostać wypełniony formularz który opisuje występującą usterkę.</br>
<img src="https://github.com/ArkadiuszMlynarski/workshop-management-system/blob/main/readmeimages/1.png" width="50%" height="50%"></br>

Po wypełnieniu pól i zatwierdzeniu formularza, zgłoszenie zostaje utworzone. Następuje przekierowanie użytkownika na stronę główną, gdzie znajduje się lista zgłoszonych usterek. Lista zawiera cztery zakładki. Pierwsza, w której wyświetlane są wszystkie zgłoszone usterki oraz trzy pozostałe, które sortują usterki poprzez ich status, tj. To Do, In Progress, Done. Użytkownik ma możliwość edytowania informacji oraz usunięcia zgłoszeń, które mają status To Do. 
![alt text](https://github.com/ArkadiuszMlynarski/workshop-management-system/blob/main/readmeimages/2.png "")</br>

Kolejny krok, to oczekiwanie na pojawienie się ofert naprawy ze strony warsztatów samochodowych. Następnie użytkownik wybiera odpowiadającą mu ofertę spośród wszystkich zgłoszonych propozycji. Szczegółowe informacje wraz z listą ofert użytkownik może zobaczyć przechodząc w odnośnik Issue Board. Ma on również możliwość odrzucenia oferty, co w konsekwencji usuwa ją z listy. Zaakceptowanie oferty skutkuje automatyczną zmianą statusu zgłoszenia na In Progress, a w polu Issue assigned to pojawiają się dane zaakceptowanej oferty oraz informacje na temat warsztatu, który wykonuję usługę.
![alt text](https://github.com/ArkadiuszMlynarski/workshop-management-system/blob/main/readmeimages/3.png "")</br>

Użytkownik oczekuję, aż usługa zostanie wykonana, a warsztat oznaczy naprawę jako wykonaną. Status zgłoszonej usterki automatycznie zmieni się wtedy na Done. Sprawia to, że na liście zgłoszonych usterek, zgłoszenie zyskuję opcję Rate Workshop, która służy do wystawienia opinii na temat wykonanej usługi. Przechodząc we wspomnianą opcję, mamy dostęp do formularza wystawiania oceny warsztatowi, który zakończył naprawę naszego pojazdu. Aby poprawnie wypełnić formularz, użytkownik wybiera ocenę w skali pięciogwiazdkowej, następnie opisuje usługę oraz wybiera z listy usługę wykonaną w warsztacie, którą chce ocenić. Dodatkowo poniżej formularza znajduje się zestawienie opinii innych użytkowników, którzy zostali obsłużeni przez serwis, ilość konkretnych ocen oraz ich średnia.
![alt text](https://github.com/ArkadiuszMlynarski/workshop-management-system/blob/main/readmeimages/4.png "")</br>

### Dodawanie pierwszego warsztatu jako Użytkownik
Podczas rejestracji profil zostaje utworzony z rolą Użytkownik, więc nie można zarejestrować się bezpośrednio jako Właściciel warsztatu. System został zaimplementowany w taki sposób, że po zalogowaniu, użytkownikowi na stronie głównej ukazuje się monit przedstawiony na poniższym rysunku. Jest on widoczny tylko i wyłącznie profilom, które nie posiadają roli Właściciel warsztatu. 
![alt text](https://github.com/ArkadiuszMlynarski/workshop-management-system/blob/main/readmeimages/5.png "")
Użytkownikowi następnie wyświetla się formularz, który zawiera informacje na temat warsztatu. Po wypełnieniu odpowiednich pól i zatwierdzeniu formularza, profil warsztatu trafia na listę oczekujących na weryfikację przez Administratora. Z kolei profil użytkownika zyskuję rolę WORKSHOP_OWNER, co czyni go właścicielem warsztatu.</br></br></br>


## Rola właściciela warsztatu
Stając się właścicielem warsztatu, użytkownikowi pojawiają się nowe funkcjonalności, do których ma dostęp poprzez odnośnik Workshop Management w panelu nawigacyjnym. Pierwszy odnośnik przekierowuje użytkownika do listy własnych warsztatów. Ma on tam również dostęp do funkcji dodania nowego warsztatu. Kolejny odnośnik służy do przeglądania usterek zgłoszonych przez innych użytkowników. Ostatni zaś pozwala na wgląd do zaoferowanych, rozpoczętych lub zakończonych przez zalogowanego usług.
![alt text](https://github.com/ArkadiuszMlynarski/workshop-management-system/blob/main/readmeimages/6.png "")</br>

Głównym zadaniem Właściciela warsztatu jest oferowanie swoich usług użytkownikom, którzy zgłosili problem ze swoim pojazdem. Pierwszym krokiem jest przeglądanie usterek zgłoszonych przez osoby potrzebujące pomocy. Aby to zrobić, użytkownik wchodzi w widoczny na powyższym rysunku odnośnik Search Issues, gdzie znajdują się zgłoszone usterki posortowane poprzez kategorie.
![alt text](https://github.com/ArkadiuszMlynarski/workshop-management-system/blob/main/readmeimages/7.png "")</br>

Po wybraniu kategorii generowana jest lista usterek związanych z konkretnym gatunkiem. Zawarte są w niej informacje odnośnie typu usterki, samochodu w którym występuje, krótki opis, lokalizacja oraz preferowana data odbycia naprawy.
![alt text](https://github.com/ArkadiuszMlynarski/workshop-management-system/blob/main/readmeimages/8.png "")</br>

Po wybraniu konkretnego zgłoszenia, właściciel warsztatu ma możliwość zaoferowania swojej usługi. Aby to zrobić należy wypełnić formularz. Po zatwierdzeniu oferta jest widoczna dla użytkownika, który stworzył zgłoszenie. Warto zauważyć, że pomimo posiadania wielu warsztatów, ofertę dla konkretnego zgłoszenia można złożyć tylko i wyłącznie jedną.</br>
<img src="https://github.com/ArkadiuszMlynarski/workshop-management-system/blob/main/readmeimages/9.png" width="50%" height="50%"></br>

Jeżeli oferta zostanie zaakceptowana przez użytkownika, zostaje ona umieszczona w polu Issue assigned to, czyli staje się częścią zgłoszenia i automatycznie jest do niego przypisana. Status zgłoszenia zmienia się na In Progress, a użytkownik jako Właściciel warsztatu ma możliwość oznaczenia usługi jako zakończona, zmieniając jej status na Done poprzez przycisk Change status to DONE. Kończy to cały proces obsługi usterki po stronie Właściciela warsztatu. 
![alt text](https://github.com/ArkadiuszMlynarski/workshop-management-system/blob/main/readmeimages/10.png "")</br>

Aby ułatwić użytkownikowi przeglądanie i zarządzanie zgłoszeniami usterek, w których zaoferował się jednym ze swoich warsztatów lub jest w trakcie wykonywania usługi, stworzona została filtrowana lista, widoczna na poniższym rysunku. Przyporządkowuje ona usterki do odpowiednich warsztatów. Ponadto wszystkie zgłoszenia zostały posortowane do trzech zakładek względem statusów. W zakładce Pending offers znajdują się zgłoszenia, w których złożono ofertę, lecz jej nie zaakceptowano. W kolejnej znajdują się te zgłoszenia, w których zostały zaakceptowane oferty i usługa jest wykonywana. Zaś w zakładce Done znajdują się już wykonane naprawy.
![alt text](https://github.com/ArkadiuszMlynarski/workshop-management-system/blob/main/readmeimages/11.png "")</br>

Właściciel warsztatu, ma dodatkowo dostęp do funkcjonalności zgłaszania nieodpowiednich opinii o własnym warsztacie administratorowi. Po oznaczeniu niewłaściwej oceny, przycisk zmienia się z Report na Unreport, aby właściciel warsztatu miał możliwość cofnięcia swojej decyzji. Administrator następnie decyduje, czy opinia faktycznie jest błędna i blokuje bądź oznacza ją jako prawidłową.
![alt text](https://github.com/ArkadiuszMlynarski/workshop-management-system/blob/main/readmeimages/12.png "")</br></br></br></br>


## Rola Administratora
Administrator posiada niezwykle ważną rolę w aplikacji. Może on przeglądać oraz zarządzać wszystkimi użytkownikami, edytować dane, usuwać bądź nadawać im prawa Administratora. Pełni on również funkcje weryfikatora złożonych zgłoszeń profili warsztatów samochodowych. Kolejnym jego przywilejem jest blokowanie opinii o warsztatach, które zostały zgłoszone przez włascicieli warsztatów. </br>
Użytkownik posiadający rolę Administratora posiada w panelu nawigacyjnym dodatkowy odnośnik Admin Panel, który przenosi do panelu administracyjnego. Dzięki niemu administrator ma wgląd w statystyki systemu, tj. ilość użytkowników posiadających poszczególne role, liczbę warsztatów zaakceptowanych, jak i tych oczekujących na weryfikację oraz ilość zgłoszonych i zablokowanych opinii. 
![alt text](https://github.com/ArkadiuszMlynarski/workshop-management-system/blob/main/readmeimages/13.png "")</br>

Po przejściu w odnośnik Users management administrator zostaje przekierowany na stronę z listą wszystkich użytkowników. Zawiera ona dane tj. imię i nazwisko, rolę, datę utworzenia i aktualizacji profilu, ilość zgłoszonych usterek, liczbę warsztatów oraz e-mail. Administrator ma możliwość edytowania danych lub usunięcia użytkowników.
![alt text](https://github.com/ArkadiuszMlynarski/workshop-management-system/blob/main/readmeimages/14.png "")</br>

Kolejnym przywilejem Administratora jest możliwość wyświetlenia profilu wraz ze szczegółowymi informacjami o konkretnym użytkowniku. Poza danymi generowanymi w liście użytkowników, wyszczególnione są tu dodatkowe dane. Widoczna jest ilość zgłoszeń na poszczególnych etapach, czy też liczba wystawionych, zgłoszonych i zablokowanych opinii. Ma on również wgląd w listę usterek zgłoszonych przez użytkownika oraz szczegóły danego zgłoszenia. Poza tym, jeżeli użytkownik jest właścicielem warsztatu samochodowego, to wyświetlana jest ich lista, wraz z danymi oraz odnośnikami do ich profili.
![alt text](https://github.com/ArkadiuszMlynarski/workshop-management-system/blob/main/readmeimages/15.png "")</br>

Po przejściu w panelu administratora do Pending Workshops, zostanie wyświetlona lista warsztatów oczekujących na weryfikację. Zawiera ona nazwę, opis, datę aplika-cji, numer kontaktowy oraz nazwę właściciela warsztatu. 
![alt text](https://github.com/ArkadiuszMlynarski/workshop-management-system/blob/main/readmeimages/16.png "")</br>

Administrator ma możliwość zaakceptowania lub odrzucenia podania o dodanie warsztatu do serwisu z poziomu listy widocznej na powyższym rysunku lub przejścia do profilu danego warsztatu.
![alt text](https://github.com/ArkadiuszMlynarski/workshop-management-system/blob/main/readmeimages/17.png "")</br>

Ostatnią funkcjonalnością Administratora jest zarządzanie opiniami. System posiada funkcję zgłaszania nieodpowiednich opinii o warsztatach samochodowych, aby ułatwić wykrywanie nieprawidłowych opinii na temat wykonanych przez nie usług. Gdy właściciel warsztatu oznaczy opinię, jako Reported, pojawi się ona w panelu administratora na liście Reported reviews.
![alt text](https://github.com/ArkadiuszMlynarski/workshop-management-system/blob/main/readmeimages/18.png "")</br>

Administrator decyduje, czy opinia jest nieprawidłowa. Jeżeli stwierdzi, że ocena jest prawidłowa, może usunąć oznaczenie opinii jako zgłoszonej, naciśnięciem przycisku Unreport. Poprzez przycisk Ban, może zablokować opinię, której wiadomość zostanie ukryta, a jej ocena nie wpłynie na ogólną ocenę warsztatu.
![alt text](https://github.com/ArkadiuszMlynarski/workshop-management-system/blob/main/readmeimages/19.png "")</br>

Drugą listą służącą do zarządzania opiniami jest lista usuniętych opinii. Służy ona do przeglądania i odblokowywania ocen, które wcześniej zostały zablokowane przez administratora. Aby do niej przejść, należy w panelu administratora wejść w odnośnik Banned reviews.
![alt text](https://github.com/ArkadiuszMlynarski/workshop-management-system/blob/main/readmeimages/20.png "")</br>
