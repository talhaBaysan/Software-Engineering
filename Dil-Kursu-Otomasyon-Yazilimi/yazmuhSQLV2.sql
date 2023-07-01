#drop database birlisanbirinsan;

CREATE DATABASE birlisanbirinsan;
use birlisanbirinsan;
CREATE TABLE kayit_elemani (eleman_id int auto_increment PRIMARY KEY,
							eleman_username varchar(255) NOT NULL,
                            eleman_password varchar(255) NOT NULL);
                            
CREATE TABLE sube (sube_id int auto_increment PRIMARY KEY,
				   isim varchar(255) UNIQUE,
                   derslik_kapasite int,
                   adres varchar(255) NOT NULL,
                   tanitim varchar(255) NOT NULL);

CREATE TABLE derslik (derslik_id int auto_increment PRIMARY KEY,
					  sube_id int NOT NULL,
                      FOREIGN KEY (sube_id) REFERENCES sube(sube_id),
                      kontenjan int);
                      
CREATE TABLE ogretmen (ogretmen_id int auto_increment PRIMARY KEY,
					   isim varchar(255),
                       soyisim varchar(255)); 
                       
CREATE TABLE ders (ders_id int auto_increment PRIMARY KEY,
				   dil varchar(255) NOT NULL,
                   sube_id int NOT NULL,
                   FOREIGN KEY (sube_id) REFERENCES sube(sube_id),
                   ogretmen_id int NOT NULL,
                   FOREIGN KEY(ogretmen_id) REFERENCES ogretmen(ogretmen_id),
                   derslik_id int NOT NULL,
                   FOREIGN KEY(derslik_id) REFERENCES derslik(derslik_id),
                   starttime time NOT NULL,
                   endtime time NOT NULL,
                   fiyat int NOT NULL,
                   gun varchar(50));
                   
CREATE TABLE dil (dil varchar(255),
			      ogretmen_id int NOT NULL,
                  FOREIGN KEY (ogretmen_id) REFERENCES ogretmen(ogretmen_id));
                  
CREATE TABLE ogrenci(id int auto_increment PRIMARY KEY,
					 isim varchar(255)  NOT NULL,
                     soyisim varchar(255) NOT NULL,
                     tc varchar(12) UNIQUE NOT NULL,
                     tel varchar(15) NOT NULL,
                     adres varchar(255) NOT NULL);

CREATE TABLE kayit(id int auto_increment PRIMARY KEY,
                    ogrenci_id int NOT NULL,
				   FOREIGN KEY(ogrenci_id) REFERENCES ogrenci(id),
				   ders_id int NOT NULL,
                   FOREIGN KEY(ders_id) REFERENCES ders(ders_id),
                   pesin int NOT NULL,
                   PRIMARY KEY (ogrenci_id, ders_id)
                   );
                   
-- kayit elemani ekleme
INSERT INTO kayit_elemani(eleman_username, eleman_password) VALUES('kayitelemani1', 'kayitelemanisifre1');

-- sube ekleme
INSERT INTO sube(isim, derslik_kapasite, adres, tanitim) VALUES("Esenler", 30, "Birlik Mah. Mehmet Akif Inan Cad. No: 6-8 Esenler / ISTANBUL", "Tanitim Esenler");
INSERT INTO sube(isim, derslik_kapasite, adres, tanitim) VALUES("Kartal", 30, "Birlik Mah. Mehmet Akif Inan Cad. No: 6-8 Kartal / ISTANBUL", "Tanitim Kartal");

-- derslik ekleme
INSERT INTO derslik(sube_id, kontenjan) VALUES(1, 50);
INSERT INTO derslik(sube_id, kontenjan) VALUES(2, 40);

-- ogretmen ekleme
INSERT INTO ogretmen(isim, soyisim) VALUES('Yunus Emre', 'Selcuk');

-- ogretmene dil ekleme
INSERT INTO dil(dil, ogretmen_id) VALUES('Ingilizce', 1);
INSERT INTO dil(dil, ogretmen_id) VALUES('Fransizca', 1);
INSERT INTO dil(dil, ogretmen_id) VALUES('Rusca', 1);

-- ders ekleme ("dil ve sube ismi verilerek")
INSERT INTO ders(dil, sube_id, ogretmen_id, derslik_id, starttime, endtime, fiyat, gun) 
VALUES('Ingilizce' ,(SELECT sube_id FROM sube WHERE isim='Esenler'), 1, 1, '12:05:00', '13:05:00', 6000, 'cuma');

INSERT INTO ders(dil, sube_id, ogretmen_id, derslik_id, starttime, endtime, fiyat, gun) 
VALUES('Ingilizce' ,(SELECT sube_id FROM sube WHERE isim='Esenler'), 1, 1, '16:05:00', '17:05:00', 6000, 'Persembe');

INSERT INTO ders(dil, sube_id, ogretmen_id, derslik_id, starttime, endtime, fiyat, gun) 
VALUES('Fransizca' ,(SELECT sube_id FROM sube WHERE isim='Esenler'), 1, 1, '14:05:00', '15:05:00', 3500, 'Sali');

INSERT INTO ders(dil, sube_id, ogretmen_id, derslik_id, starttime, endtime, fiyat, gun)
VALUES('Fransizca' ,(SELECT sube_id FROM sube WHERE isim='Kartal'), 1, 1, '14:05:00', '15:05:00', 4000, 'Pazartesi');

INSERT INTO ders(dil, sube_id, ogretmen_id, derslik_id, starttime, endtime, fiyat, gun)
VALUES('Rusca' ,(SELECT sube_id FROM sube WHERE isim='Kartal'), 1, 1, '09:05:00', '10:05:00', 4000, 'Persembe');

-- Ogrenci ekleme
INSERT INTO ogrenci(isim, soyisim, tc, tel, adres) VALUES('Utku', 'Magemizoglu', '43512373898', '5055051232', 'Utku Adres');

-- Ders kayit (ogrenci tc , ders_id ve odeme bilgisi ile kayit edince pesin(odeme) bilgisi otomatik 0 ataniyor eger taksitli ise 6 atayacaktik sanirim)
INSERT INTO kayit(ogrenci_id, ders_id, pesin) VALUES((SELECT id FROM ogrenci WHERE tc='43512373898'), 1, 0);

-- Ogrenciyi kurstan silme TC ile
DELETE FROM kayit WHERE ogrenci_id=(SELECT id FROM ogrenci WHERE tc='43512373898');
-- Ogrenciyi silme
DELETE FROM ogrenci WHERE id=(SELECT id FROM ogrenci WHERE tc='43512373898');

-- TC kontrol querysi boyle bir TCde ogrenci var mi silerken de eklerken de kullanilabilir
SELECT IFNULL((SELECT id FROM ogrenci WHERE tc = '111111'), -1);
-- kayit kontrol bu ogrenci bir derse kayitli mi kontrol querysi
SELECT IFNULL( (SELECT ogrenci_id FROM kayit WHERE ogrenci_id = (SELECT ogrenci.id FROM ogrenci WHERE tc = '43512373898') ) , -1);

-- Ogrenci listeleme calisiyordu sanirim
SELECT ogrenci.isim, ogrenci.soyisim, ogrenci.tc, kayit.pesin FROM ogrenci,kayit WHERE ogrenci.id=(SELECT ogrenci_id FROM kayit);

-- sube listeleme
SELECT GROUP_CONCAT(ders.dil ORDER BY ders.dil SEPARATOR ', ') AS diller, sube.isim, sube.adres, sube.tanitim FROM sube, ders WHERE sube.sube_id=ders.sube_id GROUP BY sube.sube_id;

-- dersleri listeleme sube id ile
SELECT ders.dil ,ders.starttime, ders.endtime, ders.gun, ders.fiyat FROM sube, ders WHERE (SELECT sube.sube_id WHERE sube.isim ='Esenler') AND ders.dil='Ingilizce';

-- taksit bilgisi getirme bilgi ogrenci.odeme odenmemis taksit sayisi (fiyat bilgisi de kullanacaksak ders.fiyattan cekilebilir) verirken  odeme/taksit sayisi (seklinde taksit sayisi 6 normalde eger degisken olacaksa ogrenci.odeme ve ogrenci.taksitsay seklinde veritabanini degistirebilirsiniz) verilebilir.
SELECT ogrenci.odeme, ders.dil FROM ogrenci, ders WHERE ogrenci.id = (SELECT ogrenci.id FROM ogrenci WHERE ogrenci.tc = '43512373898')
 AND ders.ders_id = (SELECT kayit.ders_id FROM kayit WHERE ogrenci_id = (SELECT ogrenci.id FROM ogrenci WHERE ogrenci.tc = '43512373898'));
 
 -- taksit alma durumunda ne yapilacak ogrenci idsi ile onceden 0 olup olmadigi kontrol edilip ona göre taksit al butonu devre disi birakilabilir vs. bu queryde sonuc en az 0 geliyor
 UPDATE kayit SET kayit.pesin = GREATEST(0 ,kayit.pesin - 1) WHERE kayit.ogrenci_id = (SELECT o.id FROM (SELECT * FROM ogrenci) as o WHERE o.tc = '43512373898');
 
 -- kurs secme ekranında gelecek dersler bilgiler eklenebilir cıkarilabilir fazla veya eksik olduysa
SELECT ders.dil, sube.isim, ders.gun, ders.starttime, ders.endtime, ders.fiyat FROM ders, sube WHERE ders.sube_id = sube.sube_id ORDER BY ders.dil; 