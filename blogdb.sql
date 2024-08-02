-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 25 Gru 2023, 15:27
-- Wersja serwera: 10.4.11-MariaDB
-- Wersja PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `blogdb`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `login`
--

CREATE TABLE `login` (
  `ID` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `login`
--

INSERT INTO `login` (`ID`, `name`, `email`, `password`) VALUES
(1, 'Kacper Cisek', 'kacper@interia.pl', 'asdfghjKLO98'),
(2, 'Stefan', 'stefan@interia.pl', 'fbhfhbOIU76'),
(3, 'Andrzej', 'andrzej@interia.pl', 'LKJhuny67t'),
(4, 'Gustaw', 'gustaw@interia.pl', 'plokiuHGTY65'),
(5, 'Leon', 'leon@gmail.com', 'bgtyhnJUY654');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wpisy`
--

CREATE TABLE `wpisy` (
  `id` int(11) NOT NULL,
  `id_autora` int(11) NOT NULL,
  `autor` varchar(50) NOT NULL,
  `tytul` varchar(50) NOT NULL,
  `kategoria` varchar(25) NOT NULL,
  `tresc` text NOT NULL,
  `data_dodania` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `wpisy`
--

INSERT INTO `wpisy` (`id`, `id_autora`, `autor`, `tytul`, `kategoria`, `tresc`, `data_dodania`) VALUES
(21, 3, 'Bolesław Chrobry', 'Sprawdzenie kategorii', 'Technologia', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc est erat, fringilla id nibh sit amet, pellentesque gravida risus. Nulla quis tempus enim. Ut eleifend lacinia velit at accumsan. Nulla varius ligula sit amet suscipit ultrices. Pellentesque efficitur egestas dolor et semper. Nunc lacus nunc, ultrices id lorem sed, aliquam elementum ante. Fusce aliquam tincidunt lorem, et posuere sem commodo nec. Sed vestibulum leo dui, ut cursus mi gravida vitae. Nam at luctus ex, vel facilisis diam. Praesent venenatis velit vel ullamcorper vulputate. Sed at nibh et nunc consequat molestie sed sed elit. Curabitur ultrices quam enim, sed venenatis nibh lacinia a.\n\nCurabitur augue magna, malesuada sit amet maximus sit amet, cursus non urna. Mauris id arcu leo. Aliquam eget sem at elit laoreet commodo sed sit amet dui. Integer a metus eget arcu ullamcorper vestibulum non ut nunc. Vestibulum ac sagittis quam, at condimentum purus. Donec porta efficitur finibus. Curabitur aliquam eros ipsum, a accumsan erat vulputate sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi massa, convallis vestibulum justo id, lacinia mollis mauris. Nullam ut dignissim mauris. Fusce dictum, nulla sit amet suscipit condimentum, justo arcu ornare tortor, at euismod urna dui non lorem. ', '2023-12-23 13:48:28'),
(22, 3, 'Władysław Jagiełło', 'Inny test', 'Bieżące wydarzenia', 'Cras aliquet lacinia varius. Cras pharetra, elit at pulvinar convallis, quam ex euismod diam, eu luctus ex enim at tellus. Donec volutpat, ipsum in dapibus consectetur, elit ex auctor ipsum, et hendrerit est nulla eu elit. Quisque ac tincidunt felis, ut ullamcorper nisl. Integer in auctor ex. Sed cursus tortor ac arcu pulvinar sollicitudin. Cras consectetur arcu vel sem sodales, ac interdum purus ullamcorper. Nulla faucibus nunc quis elit tempor, in aliquam ligula laoreet. ', '2023-12-23 13:49:41'),
(27, 1, 'Jan Nowak', 'Zmiany w prawie', 'Prawo', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas semper mattis dui, quis ultricies nisi posuere et. In posuere risus vel justo venenatis porta. Proin nec blandit metus. Vivamus id pellentesque velit. Curabitur malesuada urna et velit ultrices faucibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In porttitor ultrices massa vel tincidunt. Praesent non quam a ligula dictum luctus. Vestibulum luctus eros vel purus bibendum iaculis. Quisque pretium arcu mi. Vivamus id dapibus libero, nec consectetur magna. Duis pretium justo et mollis ultrices. Sed finibus hendrerit ornare. Integer eget enim vitae massa ullamcorper tristique a eu mauris. Cras nec iaculis nunc, sit amet bibendum sem.\n\nPraesent feugiat, dolor sed tristique aliquet, nibh nisl elementum libero, eu ultricies arcu purus a velit. Proin lacinia varius ligula, id ullamcorper risus finibus eu. Suspendisse ullamcorper neque ac eros bibendum lobortis. Sed nec elit porttitor dui semper placerat. Mauris pharetra, dolor ac tristique ornare, urna nisi ultrices lacus, aliquam consequat eros arcu ut felis. Etiam quis neque eget lectus auctor ultrices quis at risus. Curabitur dapibus accumsan arcu nec tempor. Phasellus posuere tortor quis nibh sollicitudin vestibulum. Fusce viverra elit non sagittis feugiat. ', '2023-12-24 11:43:47'),
(28, 1, 'Jan Nowak', 'Turniej Czterech Skoczni', 'Sport', ' Nullam tincidunt nulla vel mauris molestie blandit eu quis magna. Quisque viverra enim sit amet ultricies suscipit. Suspendisse dui tellus, egestas at eleifend sed, efficitur ut odio. Vivamus justo neque, sodales vel nunc ac, maximus suscipit mi. Praesent accumsan eget est at aliquet. Maecenas id dapibus urna, non volutpat mauris. Donec vehicula dui vitae urna posuere, a malesuada turpis pharetra. Quisque lobortis, felis id tempor sollicitudin, ex quam aliquet nibh, scelerisque feugiat quam nisi ac purus. Nunc consectetur condimentum augue vel pellentesque. Duis scelerisque semper mi sed fringilla. Vestibulum porta rutrum metus.\n\nCurabitur gravida maximus iaculis. Pellentesque semper bibendum tellus, nec efficitur odio ullamcorper a. Proin ultrices turpis eu nisi rutrum, sed finibus odio tincidunt. Praesent vel nulla aliquam, efficitur augue nec, vestibulum ex. Nunc id venenatis massa. Curabitur nec consectetur neque. Nunc cursus tincidunt nisl, at fringilla tortor suscipit eget. Mauris semper molestie aliquet. Suspendisse euismod diam nec neque maximus dapibus. In hac habitasse platea dictumst. Curabitur nec interdum risus. ', '2023-12-24 11:49:22'),
(29, 2, 'Franciszek Kowal', 'Kolejne zmiany w edukacji', 'Edukacja', 'Cras odio est, volutpat eu libero vitae, eleifend tempus ipsum. Phasellus mauris turpis, interdum at finibus ut, laoreet in nulla. Praesent sagittis eros nec ex fermentum porttitor. Maecenas laoreet odio et sodales pellentesque. Nam a libero et arcu dignissim finibus. Vestibulum tincidunt augue non tristique blandit. Morbi facilisis fermentum mauris ut dictum. Curabitur felis mi, pellentesque eu velit quis, congue ornare ipsum. Proin ac felis est. Proin in ante sit amet diam congue consectetur. Aenean et felis ullamcorper, tincidunt risus dictum, sagittis augue. Nam aliquet felis et nunc luctus, sed vehicula tellus interdum. Vivamus nec leo non neque maximus condimentum a sit amet velit. Etiam dapibus, lorem vitae placerat ullamcorper, leo magna feugiat risus, in vulputate orci tellus ac dui. Duis sit amet sagittis metus. Aliquam a sem et est ullamcorper semper. ', '2023-12-24 11:50:46'),
(31, 2, 'Grzegorz Brzęczyszczykiewicz', 'Napięta sytuacja w Gujanie', 'Bieżące wydarzenia', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut maximus tortor, a tincidunt felis. Donec vulputate pulvinar aliquet. Quisque finibus semper nibh sed sollicitudin. Nunc ligula mauris, cursus id urna sit amet, mattis tincidunt leo. Curabitur vitae ante consectetur, consectetur enim non, viverra mi. Phasellus placerat ultricies pellentesque. Pellentesque velit enim, lacinia a dapibus at, sollicitudin quis lacus.\n\nPhasellus maximus quam in ornare hendrerit. Proin accumsan urna mattis, interdum mi nec, eleifend enim. Aliquam aliquet, elit vel porta elementum, risus ex commodo nisi, at luctus lectus arcu et sapien. Aenean eget orci vel ex ullamcorper accumsan. Phasellus commodo urna vel nisi tempus ullamcorper. Cras vitae mauris vitae turpis pellentesque laoreet. Nullam in semper lacus. Aliquam gravida fringilla arcu eu rutrum. Cras a augue sit amet ipsum dapibus faucibus nec in magna. Ut condimentum diam eget sapien lobortis interdum. Nunc pellentesque lectus at mollis iaculis. Morbi maximus vel mauris feugiat gravida. Morbi sit amet lobortis enim. ', '2023-12-24 11:57:14'),
(32, 5, 'Leon Pieczak', 'Nowy minister edukacji', 'Edukacja', ' Suspendisse potenti. Donec consequat est et ex auctor condimentum. Nulla tortor augue, congue convallis sagittis eget, suscipit sit amet libero. Praesent porta id ex non interdum. Nam pellentesque urna ut nunc vulputate, tincidunt vulputate neque gravida. Duis at finibus purus. Quisque erat magna, lobortis et posuere vitae, porttitor a nisi. Sed vulputate leo ligula, sed tempus odio dapibus non. Aliquam neque diam, consequat et finibus et, pharetra at massa. Sed in nunc efficitur, dictum nulla lobortis, scelerisque ante. Pellentesque pharetra, massa vel hendrerit sodales, tortor nunc semper magna, pellentesque malesuada tortor ante vulputate felis. Phasellus tristique tincidunt orci, laoreet pharetra tellus eleifend vel.\n\nSed vel eleifend tellus, eu maximus nibh. Integer nec consequat nibh. Maecenas mollis laoreet mollis. Etiam et purus at turpis congue efficitur non nec tortor. Integer sed quam risus. Fusce fermentum turpis purus, vel gravida ex mattis vitae. Nam auctor a diam non mollis. Aliquam dictum vehicula justo. Vivamus ut purus quis tortor vulputate bibendum. Praesent aliquet velit vitae aliquam facilisis. Aliquam erat volutpat. Duis eget ipsum justo. Donec quis arcu elementum, porta mauris a, luctus purus. Maecenas facilisis libero sed pulvinar rutrum. Nulla euismod sem at velit efficitur, a tincidunt dolor pulvinar. ', '2023-12-24 12:07:53');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `wpisy`
--
ALTER TABLE `wpisy`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_autora` (`id_autora`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `login`
--
ALTER TABLE `login`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `wpisy`
--
ALTER TABLE `wpisy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `wpisy`
--
ALTER TABLE `wpisy`
  ADD CONSTRAINT `wpisy_ibfk_1` FOREIGN KEY (`id_autora`) REFERENCES `login` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
