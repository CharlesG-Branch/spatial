const _ = require('lodash')
const SqliteIndex = require('../../sqlite/SqliteIndex')

class IndexParentIdentity extends SqliteIndex {
  create (db, config) {
    try {
      let dbname = _.get(config, 'database', 'main')
      db.prepare(`
        CREATE INDEX IF NOT EXISTS ${dbname}.hierarchy_idx_parent_identity 
        ON hierarchy(parent_source, parent_id)
      `).run()
    } catch (e) {
      this.error('CREATE INDEX', e)
    }
  }
  drop (db, config) {
    try {
      let dbname = _.get(config, 'database', 'main')
      db.prepare(`
        DROP INDEX IF EXISTS ${dbname}.hierarchy_idx_parent_identity
      `).run()
    } catch (e) {
      this.error('DROP INDEX', e)
    }
  }
}

module.exports = IndexParentIdentity
