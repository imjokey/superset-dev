# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
from flask_babel import lazy_gettext as _
from sqlalchemy.orm import Query

from superset.tags.models import Tag, TagType
from superset.views.base import BaseFilter


class UserCreatedTagTypeFilter(BaseFilter):  # pylint: disable=too-few-public-methods
    """
    Filter for tag type.
    When set to True, only user-created tags are returned.
    When set to False, only system tags are returned.
    """

    name = _("Is custom tag")
    arg_name = "custom_tag"

    def apply(self, query: Query, value: bool) -> Query:
        if value:
            return query.filter(Tag.type == TagType.custom)
        if value is False:
            return query.filter(Tag.type != TagType.custom)
        return query



class UserCreatedSysTagTypeFilter(BaseFilter):  # pylint: disable=too-few-public-methods
    """
    Filter for tag type.
    When set to True, only user-created tags are returned.
    When set to False, only system tags are returned.
    """

    name = _("Is sys tag")
    arg_name = "sys_tag"

    def apply(self, query: Query, value: bool) -> Query:
        if value:
            return query.filter(Tag.type == TagType.type, ~Tag.name.contains('type:'))
        if value is False:
            return query.filter(Tag.type != TagType.type, ~Tag.name.contains('type:'))
        return query

class UserCreatedSysTagParentFilter(BaseFilter):  # pylint: disable=too-few-public-methods
    """
    Filter for tag type.
    When set to True, only user-created tags are returned.
    When set to False, only system tags are returned.
    """

    name = _("Is parent tag")
    arg_name = "parent_id"

    def apply(self, query: Query, value: any) -> Query:
        if value:
            return query.filter(Tag.type == TagType.type, ~Tag.name.contains('type:'), Tag.parent_id == int(value))
        else:
            return query.filter(Tag.type == TagType.type, ~Tag.name.contains('type:'), Tag.parent_id == None)
        return query


