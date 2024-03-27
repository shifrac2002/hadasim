CREATE TABLE `hmo`.`vaccination` (
    idVaccination INT AUTO_INCREMENT PRIMARY KEY,
    dateOfGetVaccination DATE NOT NULL,
    typOfVaccination int NOT NULL,
    idCustomer INT NOT NULL,
    FOREIGN KEY (idCustomer) REFERENCES customers(id),
    FOREIGN KEY (idCustomer) REFERENCES typofvaccination(idVaccination)
)
COMMENT = '							';
