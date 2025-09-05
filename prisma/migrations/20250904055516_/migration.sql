-- AlterTable
ALTER TABLE `Account` MODIFY `refresh_token` LONGTEXT NULL,
    MODIFY `access_token` LONGTEXT NULL,
    MODIFY `scope` LONGTEXT NULL,
    MODIFY `id_token` LONGTEXT NULL,
    MODIFY `session_state` LONGTEXT NULL;
